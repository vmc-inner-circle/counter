# Counter 설계 (2026-11-09 확정 · 최수민)

**가게마다 주소 하나.** 손님이 어떤 AI(Muse·Dots·Pickle·Grok Bot·Claude Code·일반 채팅)를 쓰든 그 주소로 들어온다. 서버는 상대를 보고 모양만 바꿔 답한다 — 브라우저 → 웹페이지(질문 채팅 + 예약 폼), 에이전트·curl → 마크다운(가게 정보 + 쓰는 법). 질문·예약은 둘 다 같은 코어(작업 상태 · 슬롯 홀드 · 기억)로 간다.

- 프로토콜은 우리 것(작업 상태 `input-required` → `completed`/`rejected`, 슬롯 홀드, 기억). MCP는 커넥터 등록이 필요해 접근성이 낮아 **선택 사항** — 실측 후 빈틈이 있을 때만 붙인다
- 손님 쪽 4종은 모두 자체 브라우저로 폼을 채운다(공개 자료 기준, 미검증) → **웹페이지 예약 폼이 핵심**
- 성능은 전송 방식이 아니라 왕복 수로 줄인다: `ask`·`book`에 `wait`를 붙여 5턴 → 3턴
- 호스팅하지 않는다(2026-11-09 최수민 — 실측 실험을 하지 않기로 해 공개 주소가 필요 없다). 시연은 로컬 + 자동 녹화 클립으로 한다. 코드는 `app/`만. 공개할 일이 생기면 `ADMIN_TOKEN`으로 사장님 화면을 잠근다

## 다음 순서
1. ✅ 예약 폼(`/s/dojagi?view=html`) + 마크다운 맨 위에 "브라우저로 예약하려면 이 페이지" 링크 · 클립 `store-book`
2. ✅ `ask`·`book`에 `"wait":60` → 에이전트 호출 3번(문서·ask·book)으로 끝남. 재실측(11/09, Claude Code, 사장님 응답 5초×2): **28초** — 이전 26초보다 빨라지지 않았다. 줄어든 것은 호출 수이고, 시간은 사장님 응답 10초와 에이전트 답장 작성이 차지한다
3. ~~실제 에이전트(Pickle 등) 실측~~ — 하지 않기로 함
4. ~~Fly.io 배포~~ — 하지 않기로 함. 그래서 손님 4종이 실제로 폼을 채울 수 있는지는 공개 자료 기준 추정으로 남는다(미검증)

## 그림
| | |
|---|---|
| ![](architecture/01.png) | ![](architecture/02.png) |
| ![](architecture/03.png) | ![](architecture/04.png) |
| ![](architecture/05.png) | ![](architecture/06.png) |
| ![](architecture/07.png) | ![](architecture/08.png) |

원본: [`architecture/brief.html`](architecture/brief.html)
