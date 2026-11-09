#!/usr/bin/env python3
"""Counter demo clip recorder — 영상팀이 손으로 녹화하지 않게, 제품 화면을 대본대로 돌려 mp4로 뽑는다.

  python3 app/demo/record.py                 # 모든 장면
  python3 app/demo/record.py uc3-approve     # 한 장면만
  python3 app/demo/record.py --agent Pickle --user "Wei Chen"   # 손님 에이전트·이름 바꾸기

출력: video/demo-clips/<장면>.mp4 (1080×1920, 9:16). 제품을 고치면 다시 돌리면 된다.
매 장면마다 빈 데이터로 서버를 따로 띄우므로 로컬 app/data/state.json은 건드리지 않는다.
필요: python playwright(chromium), ffmpeg.
"""
import argparse, json, os, shutil, socket, subprocess, sys, tempfile, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

APP = Path(__file__).resolve().parents[1]
OUT = APP.parent / 'video' / 'demo-clips'
W, H, ZOOM = 1080, 1920, 2.5  # 9:16 화면, 폰 폭(432px) 레이아웃을 2.5배로 키워 선명하게 찍는다

# 탭한 곳에 원을 띄워 시청자가 "여기를 눌렀다"를 볼 수 있게 한다
INIT_JS = f"""
addEventListener('DOMContentLoaded', () => {{
  document.documentElement.style.zoom = {ZOOM};
  const st = document.createElement('style');
  st.textContent = '.__tap{{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(15,27,42,.28);border:2px solid rgba(255,255,255,.9);pointer-events:none;z-index:99999;animation:__t .6s ease-out forwards}}@keyframes __t{{0%{{transform:scale(.5);opacity:1}}100%{{transform:scale(1.5);opacity:0}}}}';
  document.head.appendChild(st);
}});
window.__tap = (x, y) => {{ const d = document.createElement('div'); d.className = '__tap'; d.style.left = x + 'px'; d.style.top = y + 'px'; document.body.appendChild(d); setTimeout(() => d.remove(), 700); }};
"""


class Server:
    def __init__(self):
        s = socket.socket(); s.bind(('127.0.0.1', 0)); self.port = s.getsockname()[1]; s.close()
        self.dir = tempfile.mkdtemp(prefix='counter-demo-')
        env = {**os.environ, 'PORT': str(self.port), 'STATE_FILE': os.path.join(self.dir, 'state.json')}
        env.pop('ADMIN_TOKEN', None)
        self.p = subprocess.Popen(['node', str(APP / 'server.mjs'), '--reset'], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        self.base = f'http://127.0.0.1:{self.port}'
        for _ in range(50):
            try: urllib.request.urlopen(self.base + '/llms.txt', timeout=1); return
            except Exception: time.sleep(0.1)
        raise RuntimeError('server did not start')

    def call(self, path, body=None):
        req = urllib.request.Request(self.base + path, data=json.dumps(body or {}).encode(), headers={'content-type': 'application/json'}, method='POST')
        return json.load(urllib.request.urlopen(req, timeout=5))

    def stop(self):
        self.p.terminate(); self.p.wait(); shutil.rmtree(self.dir, ignore_errors=True)


# ---- 대본에 쓰는 동작
class Director:
    def __init__(self, page, srv, who):
        self.page, self.srv, self.who = page, srv, who

    def hold(self, s): self.page.wait_for_timeout(int(s * 1000))

    def tap(self, sel):
        el = self.page.locator(sel).first
        el.wait_for(state='visible', timeout=10000)
        b = el.bounding_box()
        self.page.evaluate('([x,y]) => window.__tap(x/%s, y/%s)' % (ZOOM, ZOOM), [b['x'] + b['width'] / 2, b['y'] + b['height'] / 2])
        self.hold(0.25); el.click(); self.hold(0.3)

    def type(self, sel, text):
        self.tap(sel); self.page.locator(sel).first.press_sequentially(text, delay=45)

    def ask(self, q, agent=None, user=None):
        return self.srv.call(f'/api/s/soi-derm/ask', {'agent': agent or self.who['agent'], 'on_behalf_of': user or self.who['user'], 'question': q})

    def book(self, service='rejuran', date='2026-11-10', time_='15:00'):
        return self.srv.call('/api/s/soi-derm/book', {'agent': self.who['agent'], 'on_behalf_of': self.who['user'], 'service': service, 'date': date, 'time': time_,
                                                   'patient': {'name': self.who['user'], 'nationality': self.who['nat']}, 'notes': self.who['notes']})

    def see(self, text): self.page.get_by_text(text).first.wait_for(timeout=10000)


Q = 'Do you have a female doctor?'
A = 'Yes — Dr. Kim sees patients Tue & Thu.'
Q_AGAIN = 'Is there a female doctor?'
MEM = {'agent': 'Dots', 'user': 'Nguyen Thi Lan'}  # 같은 질문을 다시 하는 다른 에이전트


# 화면은 시안 A(채널톡형): 대화 목록 → 손님 대화 → 하단의 Approve / 답장. 선택자는 문구가 아니라 data-* 로 잡는다
def to_list(d):
    if d.page.locator('[data-act=back]').count(): d.tap('[data-act=back]')
    d.page.wait_for_selector('[data-screen=list]')


def open_conv(d, agent, user):
    to_list(d); d.tap(f'[data-conv="{agent}|{user}"]'); d.page.wait_for_selector('[data-screen=thread]')


def uc2_answer(d):   # 모르는 질문 → 사장님이 한 번 답하고 기억
    d.hold(1.5); d.ask(Q); d.see(Q); d.hold(1.2)
    open_conv(d, d.who['agent'], d.who['user']); d.hold(1.0)
    d.type('#reply', A); d.hold(0.8)
    d.tap('[data-act=send]'); d.see('You answered'); d.hold(2.5)


def uc2_memory(d):   # 다른 에이전트가 같은 질문 → 사장님 없이 바로 답
    to_list(d); d.hold(1.5); d.ask(Q_AGAIN, agent=MEM['agent'], user=MEM['user']); d.see('Answered from memory'); d.hold(1.2)
    open_conv(d, MEM['agent'], MEM['user']); d.see('answered from memory'); d.hold(3.0)


def uc3_approve(d):  # 예약 요청 → 슬롯 잡아 둠 → 탭 한 번 승인
    d.hold(1.5); d.book(); d.see('approve?'); d.hold(1.2)
    open_conv(d, d.who['agent'], d.who['user']); d.hold(1.2)
    d.tap('[data-act=approve]'); d.see('Booked'); d.hold(3.0)


def full_flow(d):    # video/soonhyung C2 순서: 목록 → Emma 대화 → Approve → 모르는 질문에 답 → 다른 에이전트는 기억으로 즉답
    d.hold(1.5); d.book(); d.ask(Q); d.see('approve?'); d.hold(1.2)
    open_conv(d, d.who['agent'], d.who['user']); d.hold(1.2)
    d.tap('[data-act=approve]'); d.see('Booked'); d.hold(1.5)
    d.type('#reply', A); d.hold(0.8)
    d.tap('[data-act=send]'); d.see('You answered'); d.hold(2.0)
    uc2_memory(d)


def setup_learned(d):  # uc2-memory 장면 전에: 이미 한 번 배운 상태로 만든다(녹화 안 됨)
    t = d.ask(Q); d.srv.call(f'/admin/api/tasks/{t["id"]}/answer', {'answer': A, 'remember': True})


SCENES = {
    # 장면 id: (설명, 녹화 전 준비, 대본)  — 번호는 video/demo-clips.md
    'uc2-answer':  ('사장님 폰: 모르는 질문이 들어와 한 번 답하고 "기억" (UC-2, #4)', None, uc2_answer),
    'uc2-memory':  ('사장님 폰: 다른 에이전트의 같은 질문이 사장님 없이 바로 답됨 (UC-2, #4)', setup_learned, uc2_memory),
    'uc3-approve': ('사장님 폰: 예약 요청 → 탭 한 번 승인 → 확정 (UC-3, #1~3)', None, uc3_approve),
    'full':        ('사장님 폰: 예약 승인 → 질문 답변 → 기억으로 즉답 (한 번에)', None, full_flow),
}


def record(pw, sid, who):
    desc, setup, script = SCENES[sid]
    srv = Server(); tmp = tempfile.mkdtemp(prefix='counter-rec-')
    try:
        browser = pw.chromium.launch()
        ctx = browser.new_context(viewport={'width': W, 'height': H}, record_video_dir=tmp, record_video_size={'width': W, 'height': H})
        ctx.add_init_script(INIT_JS)
        page = ctx.new_page()
        d = Director(page, srv, who)
        if setup: setup(d)
        t0 = time.time()
        page.goto(srv.base + '/admin'); page.wait_for_selector('[data-screen=list]'); lead = time.time() - t0
        script(d)
        ctx.close(); browser.close()
        webm = next(Path(tmp).glob('*.webm'))
        OUT.mkdir(parents=True, exist_ok=True)
        mp4 = OUT / f'{sid}.mp4'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{lead + 0.2:.2f}', '-i', str(webm), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-r', '30', '-movflags', '+faststart', str(mp4)], check=True)
        dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(mp4)], capture_output=True, text=True).stdout)
        print(f'✓ {sid:12s} {dur:4.1f}s  {mp4.relative_to(APP.parent)}  — {desc}')
    finally:
        srv.stop(); shutil.rmtree(tmp, ignore_errors=True)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('scenes', nargs='*', help=' / '.join(SCENES))
    ap.add_argument('--agent', default='Muse'); ap.add_argument('--user', default='Emma Clarke')
    ap.add_argument('--nat', default='GB'); ap.add_argument('--notes', default='Uses a wheelchair')
    a = ap.parse_args()
    bad = [s for s in a.scenes if s not in SCENES]
    if bad: sys.exit(f'unknown scene: {bad} — choose from {list(SCENES)}')
    who = {'agent': a.agent, 'user': a.user, 'nat': a.nat, 'notes': a.notes}
    with sync_playwright() as pw:
        for sid in a.scenes or SCENES: record(pw, sid, who)
