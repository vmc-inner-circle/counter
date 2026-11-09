# Counter 설계 (2026-11-09 확정 · 최수민)

**가게마다 주소 하나.** 손님이 어떤 AI(Muse·Dots·Pickle·Grok Bot·Claude Code·일반 채팅)를 쓰든 그 주소로 들어온다. 사람용 화면은 없다 — 누가 열어도 에이전트가 읽는 마크다운(가게 정보 + 쓰는 법)이 보인다(브라우저에는 링크만 눌리게 감싼 같은 글). 질문·예약은 둘 다 같은 코어(작업 상태 · 슬롯 홀드 · 기억)로 간다.

- 프로토콜은 우리 것(작업 상태 `input-required` → `completed`/`rejected`, 슬롯 홀드, 기억). MCP는 커넥터 등록이 필요해 접근성이 낮아 **선택 사항** — 실측 후 빈틈이 있을 때만 붙인다
- 손님 쪽 4종은 자체 브라우저를 쓴다(공개 자료 기준, 미검증) → 브라우저에서도 **GET 링크**로 질문·예약이 된다
- 성능은 전송 방식이 아니라 왕복 수로 줄인다: `ask`·`book`에 `wait`를 붙여 5턴 → 3턴
- 호스팅: Fly.io `counter-agent`(도쿄, 1대 상시 + 볼륨) — https://counter-agent.fly.dev/s/drd-yeongdeungpo (13:30 최수민 — 실측은 안 하지만 라이브 링크는 둔다). 배포본 데이터는 `seed-drd.json`(닥터디자이너의원 영등포점 공개 정보), 사장님 화면은 `ADMIN_TOKEN`으로 잠금

## 다음 순서
1. ✅ ~~예약 폼~~ → **사람용 화면 없음**(13:50 최수민): 가게 주소를 사람이 열어도 에이전트가 읽는 마크다운 그대로 보인다. 브라우저만 있는 에이전트는 같은 동작을 GET 링크로 한다(`/ask?q=` · `/book?service=&date=&time=&name=`) · 클립 `agent-view`
2. ✅ `ask`·`book`에 `"wait":60` → 에이전트 호출 3번(문서·ask·book)으로 끝남. 재실측(11/09, Claude Code, 사장님 응답 5초×2): **28초** — 이전 26초보다 빨라지지 않았다. 줄어든 것은 호출 수이고, 시간은 사장님 응답 10초와 에이전트 답장 작성이 차지한다
3. ~~실제 에이전트(Pickle 등) 실측~~ — 하지 않기로 함
4. ✅ Fly.io 배포(11/09 13:40). HTTPS로 예약→승인→확정 확인. 손님 4종이 실제로 폼을 채울 수 있는지는 공개 자료 기준 추정(미검증)

## 그림
| | |
|---|---|
| ![](architecture/01.png) | ![](architecture/02.png) |
| ![](architecture/03.png) | ![](architecture/04.png) |
| ![](architecture/05.png) | ![](architecture/06.png) |
| ![](architecture/07.png) | ![](architecture/08.png) |

원본: [`architecture/brief.html`](architecture/brief.html)
