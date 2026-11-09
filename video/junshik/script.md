# 황준식 안 — 시나리오 v4.2 (90초 = 서론 30 · 본론 30 · 결론 30)

> **v4.2 (13:45) — 상시녹음 3 피드백 반영 + 마지막 장면 교체** (영상 = `counter_junshik_v4_16x9.mp4`)
> - 색: 당근 팔레트 `#FF6F0F` (13:17 브랜드 변경)
> - #3 사람 → 에이전트 화살표 · #6 848 아래 「2 in 3 hung up on the AI.」(기사 확인: 약 3분의 1만 AI와 통화를 이어감. 회의의 «100건»은 기사에서 확인 안 돼 쓰지 않음)
> - #7 「Everyone loses」 각자 이유 한 줄: Shop «Drowning in robot calls» · Agent «Nobody picks up» · Customer «Can't get an answer» (people → customer)
> - #8 Counter 가 에이전트 넷(왼쪽)과 사장님(오른쪽) **사이**에 등장
> - #11 에이전트 문의가 Counter 에서 **초록 자동 완료**로 줄줄이 쌓이는 칸 + 사장님에게는 1건만
> - #13 「Any language」 삭제 → 「Customers get what they asked.」
> - #16 「Customers win」 + 각자 이긴 이유 한 줄(Back to their craft · Always answered · Get it done)
> - #17(80–86) **지구본** — 여러 나라의 에이전트가 Counter 로 연결되고, Counter 에서 다시 업종(식당·병원·공장·미용실·숙소)으로 연결. 문구는 주어가 바뀜: OpenAI → Meta → xAI → Anthropic spreads agents. → **We build their Counter.** (회의 슬로건)
> - #18 엔드카드 86–90

- 만든 때: 2026-11-09 12:55경 (황준식 지시 + Claude). v4 의 이야기를 **스타일 A+B**(황준식 승인)로 컷 단위로 다시 쓴 판. 이전 판은 git 기록에
- 형식: **16:9 가로(1920×1080)** 모션 그래픽 (13:00 황준식 지시로 가로로) · 나레이션 없음, BGM + 효과음 · **화면 글자는 컷마다 한 줄**
- 따른 결정: [상시녹음 2](../../docs/meeting-logs/261109_상시녹음2-영상시안리뷰-메시지.md) · [`video/README.md`](../README.md) 영상 원칙 — 자동화가 메인·글로벌은 덧붙임 / 속도 비교 없음 / 예약 확정을 효용으로 내세우지 않음 / 흐름 = 사람 → 에이전트 → Counter → 사장님, 대부분 Counter 에서 끝남 / Counter 는 채팅 UI 아님 / 한 컷 한 시선

## 스타일 = A + B (승인 12:50)

| | 무엇을 가져오나 |
|---|---|
| **A. 톤** — [Notion 3.0 한국 론칭 영상](https://youtu.be/rfU_yL-oc80) (조순형 안과 같은 레퍼런스) | 크림 바탕 `#F6F5F0`, 먹색 글자 `#141414`, 강조 주황 `#FF6B3D`, 큰 굵은 타이포(Pretendard ExtraBold, OFL), **핵심 낱말 뒤 형광 밑줄**(주황 18%), 흰 말풍선, 손그림 캐릭터(사장님 `owner.png`), 에이전트 공식 아이콘(`../common/agents/`), 여백 많이 |
| **B. 장면 틀** — [이성렬 9:16 모션 키트](../seongryeol/motion-kit/README.md) | `rs-kinetic-type`(서론 훅: 비트마다 카피 쾅) · `rs-flow-insert`(본론 흐름 도식: 노드 카드·화살표·체크) · `rs-screen-demo`(사장님 앱 화면 위 줌·강조 박스) · `rs-spring-wordmark`(엔드카드) — 색·문구만 A 톤으로 바꿔 쓴다 |

- 전환: 컷마다 0.3초 안팎의 짧은 밀기·줌. 화면 흔들기·글리치 없음
- 소리: BGM(밝은 플럭, 팀 ElevenLabs) + CC0 효과음(휙·뿅·딸깍·쿵·전화벨) — `motion/assets/`
- 한 컷 = 2~4초, 글자는 한 줄(두 호흡이면 두 컷)

## 서론 0–30초 — 문제 제기

| # | 시간 | 화면 (한 컷 한 시선) | 화면 문구 (__밑줄__ = 형광) | 소리 | 틀 |
|---|---|---|---|---|---|
| 1 | 0–3 | 크림 바탕에 굵은 카피가 비트마다 한 낱말씩 쾅 | The / __agent__ / invasion / has begun. | 킥 ×4 | B kinetic-type |
| 2 | 3–7 | Muse·Pickle·Dots·Grok Bot 아이콘이 화면 위에서 쏟아져 사람 아이콘 하나하나에 붙음. 숫자 0 → 1,000,000,000 | __1,000,000,000__ agents | 뿅뿅뿅, BGM 시작 | A |
| 3 | 7–11 | 사람 셋이 흰 말풍선으로 부탁(🏥 ♿ / 🍜 4명 / 🏨 2박) → 각자의 에이전트가 출발 | Everyone has an __agent__. | 휙 | A |
| 4 | 11–17 | **가게 하나**(가운데) — 사방에서 에이전트 아이콘이 몰려와 동시에 전화, 가게가 흔들리고 전화 수가 0 → 120 으로 치솟음 (핵심: 에이전트들이 한 가게에 무차별로) | They all call __one shop__. / All at __once__. | 전화벨 여러 겹 | A |
| 5 | 17–22 | 사장님 클로즈업, 주황 전화 곡선이 둘레를 빙빙. 말풍선 「Another bot?」 → 수화기 쾅 | Owners __hang up__. | 통화 중 신호음 | A |
| 6 | 22–26 | 큰 숫자 848, 아래 작게 출처 | One agent. __848__ shops. | 쿵 | A |
| 7 | 26–30 | 세 칸: 사장님 😩 · 에이전트 아이콘에 ✕ · 사람 아이콘에 ❓ | __Everyone__ loses. | BGM 가라앉음 | A |

## 본론 30–60초 — Counter가 하는 일, 그래서 좋아지는 것

| # | 시간 | 화면 | 화면 문구 | 소리 | 틀 |
|---|---|---|---|---|---|
| 8 | 30–34 | 전화기 아이콘에 주황 ✕ → Counter 로고가 사장님 앞에 스프링처럼 내려앉음 | Meet __Counter__. | 쿵, BGM 다시 밝아짐 | A |
| 9 | 34–38 | 두 줄, 둘째 줄만 주황 (두 호흡) | Phones are for people. / __Counter is for agents.__ | 딸깍 | A |
| 10 | 38–43 | 흐름 도식: 노드 카드 사람 → 에이전트 → **Counter** → 사장님, 화살표가 위에서 아래로 그려지고 꼬리표 점이 흐름 | One __front door__ for every agent. | 휙, 뿅 | **B flow-insert** |
| 11 | 43–48 | 에이전트 아이콘 수십 개(위) → 선이 모여 Counter 카드(가운데) → 대부분 ✓로 끝남, 주황 점선 하나만 사장님 폰 카드로. 숫자 「47 answered · 1 needs you」 | Most end __here__. | 틱틱틱 | A (조순형 안과 같은 꼴) |
| 12 | 48–54 | 사장님 앱 화면(실제 녹화 `uc2-answer` → `uc2-memory`) — 처음 듣는 질문 1건에 한 번 답하고 Remember, 다음 에이전트는 「Answered from memory」 — 강조 박스·줌 | Only what __needs you__. / Answer __once__. | 탭, 뿅 | **B screen-demo** (클립 #1) |
| 13 | 54–60 | 효용 세 컷 빠르게: ① 사장님이 진짜 손님을 맞음(폰은 🔕) ② 에이전트에 ✓(끊기지 않음) ③ 국기 넷이 차례로 | Owners stay __free__. / Agents get __answers__. / Any __language__. | 뿅 ×3 | A |

## 결론 60–90초 — 앞으로의 방향·포부: 모두가 이기는 채널

| # | 시간 | 화면 | 화면 문구 | 소리 | 틀 |
|---|---|---|---|---|---|
| 14 | 60–67 | 업종 네 컷이 2초씩: 셰프가 요리 · 의사가 환자를 · 공장 라인 · 미용사가 손님을 — 가게 문 옆에 작은 Counter 로고 | Every shop focuses on __its craft__. | BGM 고조 | A |
| 15 | 67–73 | 서론 4번과 같은 **한 가게** 구도인데 이번엔 에이전트가 문 앞 Counter 에서 ✓를 받고 사람에게 돌아감(전화벨 없음) | Agents __welcomed__, not hung up. | 뿅뿅뿅 | A |
| 16 | 73–80 | 세 원(가게 · 에이전트 회사 · 사람)이 겹치고 가운데 Counter. 원마다 차례로 ✓ — 서론 7번 「Everyone loses」의 반대 | Shops win. Agents win. __People win.__ | 쿵 ×3 | A |
| 17 | 80–85 | 지구 위 가게 점들이 하나씩 주황으로 켜짐 | Tech spreads agents. / We build their __front door__. | 리프트 | A |
| 18 | 85–90 | 엔드카드: Counter 워드마크가 튀어 오름 + 한 줄 | __Counter__ — every shop, ready for AI customers. | 마지막 쿵, 페이드 | **B spring-wordmark** |

## 필요한 소재

| 무엇 | 어디서 | 상태 |
|---|---|---|
| 사장님 캐릭터 `owner.png` | 조순형 build/assets → `motion/assets/` | 있음 |
| 에이전트 아이콘 | `../common/agents/` | 있음 |
| Counter 로고 | 팀 확정 필요 — 조순형 안 주황 「C」(`counter_logo.png`) vs `app/public/counter.png` 마스코트 | **13:15 싱크에서 정함** |
| 사장님 앱 화면 녹화(#12) | [`../demo-clips/`](../demo-clips/) 자동 녹화(9:16, 시안 A) — `uc2-answer.mp4`(한 번 답 + Remember) → `uc2-memory.mp4`(다음 에이전트는 기억으로). 예약 승인(`uc3-approve`)은 효용으로 내세우지 않으므로 짧게만 | **있음** (12:36) |
| 업종 일러스트(#14) | 사장님 캐릭터와 같은 손그림 톤으로 생성 필요(셰프·의사·공장·미용사) | 없음 — 생성 or 아이콘으로 대체 |
| BGM·효과음 | `motion/assets/` | 있음 |
| 서체 Pretendard(OFL) | 조순형 build/fonts | 있음 |

## 열린 것 (13:15 싱크)

- 슬로건 후보: 「Tech spreads agents. We build their front door.」(상시녹음 2 포부 「테크 기업들이 에이전트 확산에 힘쓸 때 우리는 그들을 위한 채널을 판다」를 줄임) · 「Phones are for people. Counter is for agents.」
- Counter 로고 확정(위 표)
- 나레이션 넣을지 — 넣는다면 화면 문구를 그대로 읽는 짧은 줄

## 사실 근거

- 848곳: The San Francisco Standard, 2026-10-29, 「Press 1 if you're a robot: AI agents keep calling local businesses」 https://sfstandard.com/2026/10/29/ai-agents-calling-local-businesses/
- 「Agents get answers / 끊기지 않음」: 상시녹음 2 「에이전트도 무시당하지 않고 응답이 빠르다」 — 팀 주장, 측정값 아님. 화면에 % 숫자 넣지 않음
- 「47 answered · 1 needs you」: 그림 속 예시 숫자(연출) — 실측 아님. 화면 구석에 `figures illustrative` 작게
