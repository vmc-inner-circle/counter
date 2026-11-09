# 조순형 — 영상 안

## 영상 초안

| 버전 | 시각 | 링크 | 바뀐 점 |
|---|---|---|---|
| v1 | 11/09 11:06 | (나레이션형, 폐기) | 검정 배경 + 나레이션 + 자막. 레퍼런스 톤과 달라 접음 |
| v2 draft | 11/09 11:36 | (폐기) | 나레이션 없음 · BGM + 화면 텍스트 · 크림 바탕 모션그래픽 · 한국어판/영어판 각 89초 |
| **v2.1 draft** | 11/09 12:2x | 링크: 업로드 후 기입 | 순형 피드백 6개 반영 — 나레이션 5줄, 워크플로우 도식, 혼내는 장면 삭제·체인 전환, 강점 3컷, 사장님 폰(시안 A), 슬로건 교체. 각 89.5초 |

레퍼런스: [Notion 3.0 한국 론칭 영상](https://youtu.be/rfU_yL-oc80) — 나레이션 없이 BGM, 흰 바탕, 큰 타이포, 캐릭터 말풍선, 실제 UI 카드.

## 구성 v2.1 (89.5초)

| 구간 | 시간 | 내용 | 나레이션 |
|---|---|---|---|
| A 인트로 | 0–6.8 | 로고 클릭 → "이제 손님은 에이전트입니다" | n1 "이제 손님은 사람이 아니라, 에이전트입니다." |
| B 페인 | 6.6–22.4 | Muse·Pickle·Dots 심부름 → 100곳 동시 전화 → 사장님 허둥(전화 쏟아짐) | — |
| B' 전환 | 22.4–31 | 사장님이 오른쪽으로 이동, 왼쪽에 **사용자 → Pickle → Counter → 사장님** 체인이 순서대로 생김 → COUNTER | n2 "그래서 매장마다 에이전트를 둡니다. Counter." |
| C1 워크플로우 | 31–45 | 상단 에이전트 42개 → Counter 3개(피부과·식당·숙소)로 선 연결, 대부분 즉답(✓), 확인 필요한 것만 사장님 폰으로 주황 선 | n3 "수백 개의 에이전트 문의를 Counter가 받고, 사장님 확인이 필요한 것만 폰으로 보냅니다." |
| C2 사장님 폰 | 45–62 | `design/inbox` 시안 A 그대로: 목록 → Emma 스레드 → **Approve 탭** → "여성 의사?" 질문 → 답 입력(Remember 켜짐) → 전송 → "Dots가 같은 질문 · 기억으로 즉답" | n4 "탭 한 번이면 확정. 모르는 질문은 한 번만 답하면 기억합니다." |
| D 강점 | 62–74 | "받은 전화, 0통." / "모든 에이전트, 모든 언어, 24시간." / "확정은 언제나 사장님이." | — |
| E 클로징 | 74–89.5 | 사장님 "오늘 문의 18건, 받은 전화 0통" → Pickle 웃음 → **"Phones are for people. Counter is for agents."** → 로고 | n5 슬로건 |

### 11/09 12:00 피드백 반영

| 피드백 | 반영 |
|---|---|
| 1 나레이션 적절히 | 5줄만. 훅 · Counter 소개 · 워크플로우 · 사장님 폰 · 슬로건. BGM은 나레이션 구간에서 자동 덕킹 |
| 2 워크플로우 보여주기 | C1: 에이전트 다수 → Counter 몇 개 → 확인 필요한 것만 사장님으로 선 연결(점이 흐름) |
| 3 혼내는 장면 혼란 | 삭제. 사장님이 사라지지 않고 오른쪽으로 밀리며 왼쪽에 사용자-피클-Counter 체인 등장 |
| 4 강점이 안 보임 | D 구간 3컷 + C2 왼쪽 키라인("탭 한 번 / 모르는 질문은 한 번만 / 다음부턴 기억") |
| 5 데모는 사장님 사이드만 | 에이전트↔Counter 채팅 UI 삭제. 제품 화면은 사장님 폰(시안 A 채널톡형)만. 유스케이스의 "에이전트↔Counter는 영어" 문제도 함께 해소 |
| 6 슬로건 교체 | "Phones are for people. Counter is for agents." (나레이션 + 화면) |

대본·컷별 콘티: [`script.md`](script.md) · 정지 프레임: [`stills_ko.png`](stills_ko.png) · [`stills_en.png`](stills_en.png)

## 남은 것

- 사장님 폰 장면은 시안 A를 코드로 다시 그린 것. 실제 `/admin`이 시안 A로 바뀌면 화면 녹화로 교체 가능
- 식당·숙소 이름은 가칭. 나레이션 보이스는 임시(ElevenLabs Jinwoo/Daniel)
- 최종본은 60fps + 모션블러(`npm run final`, 수십 분)

## 만드는 법

`build/` 한 폴더. HTML 한 장이 `seek(t)`로 모든 프레임을 그리고, Playwright가 캡처해 ffmpeg로 묶는다 ([Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics)의 `explainer-default` 방식).

```bash
cd build && npm i && npx playwright install chromium
open demo21_ko.html          # v2.1 (demo_ko.html은 v2) — 브라우저에서 재생·스크럽
npm run stills               # 정지 프레임 검수
npm run draft                # 30fps 드래프트 (약 30초)
npm run final                # 60fps + 모션블러 (수십 분)
```

- 한국어판 `demo21_ko.html` / 영어판 `demo21_en.html` — `const LANG` 한 줄만 다르다
- 소재: `assets/` (캐릭터·BGM·효과음·나레이션 `vo/`), 폰트 `fonts/` (Pretendard, OFL). 에이전트 공식 이미지는 `video/common/agents/` 복사본
- BGM: ElevenLabs Music 생성 (팀 보유 계정) · 효과음: motion-graphics 번들 CC0 kit · Pickle 이미지: Google Play 아이콘(순형 승인) · 사장님 캐릭터: 생성 이미지
- 음량: 드래프트 측정 -16.9 LUFS, 피크 -0.8 dBFS

## 코멘트

<!-- 다른 팀원 의견은 여기 한 줄씩: "- 이름: 의견" -->
