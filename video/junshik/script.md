# 황준식 안 — 대본·화면 지시서 v3.1

- 만든 때: 2026-11-09 11시경 (황준식 + Claude) · v3.1 11:20경 — 회의록 d3fef95·1edbea7 반영(숙소 에이전트 Grok→**Dots**, 엔딩 = 사람 4분할 실사 컷)
- 모션 그래픽 초안: [`motion/index.html`](motion/index.html) — 브라우저로 열고 Space
- 기준: 11/09 현장 R&R·스펙 회의, 후속 데모 시나리오·영상 흐름 회의, Notion Kickoff 「System Demo Scenarios」, `server.mjs` 데모(f2d442b)
- 형식: **모션 그래픽** + 데모 녹화(플레이스홀더 → `../demo-clips.md` 번호)
- 흐름(후속 회의 결정 + 11:30 황준식 수정): 인트로 ~10초 → **병원 클로즈업, 병원에서의 문제 ~5초** → **다시 클로즈업, 시스템 데모** → 클로징 · 전체 83초 (식당 문제 장면은 뺐음)

## 대본 (영어 내레이션 = 자막)

| 시간 | 장면 | 내레이션 (EN) | 한국어 뜻 |
|---|---|---|---|
| 0–2s | 우주, 노란 글자가 비스듬히 멀어짐 | *(글자만)* **The Agent Invasion Has Begun.** | 에이전트들의 침공이 시작되었다. |
| 2–9s | Muse·Pickle·Dots·Claude Duet 아이콘이 지구 위로 쏟아져 사람마다 하나씩 붙음 | "Every AI company is racing to give a billion people their own agent." | 모든 AI 회사가 10억 명에게 각자의 에이전트를 쥐여 주려고 경쟁 중이에요. |
| 9–10s | 지구에 📍 Seoul → 그 점으로 줌인 | *(이어짐)* | |
| 10–15s | **병원 클로즈업 · 문제** (Soi Dermatology 접수대): 전화가 쉬지 않고 울림, AI 전화 말풍선이 영어·중국어·베트남어로 쌓임, 부재중 0→47, 직원 😵‍💫 → 끊음, 줄 선 진짜 환자들 😤. 오른쪽 아래 848 카운터 + 출처 | "And they all call the same small shops. One agent called 848 businesses in a few hours. Staff just hang up." | 그리고 모두 같은 작은 가게에 전화해요. 에이전트 하나가 몇 시간 만에 848곳에 전화했어요. 직원은 그냥 끊어요. |
| 15–20s | **다시 클로즈업** — 접수대 전화로 들어가 → 전화기 X → 병원 지도 카드에 🤖 `Agent: …/s/soi-derm`, 에이전트 말풍선이 그 링크로 빨려 들어감 | "Phones are for people. Counter is for agents. One link on your map listing." | 전화는 사람을 위한 것. Counter 는 에이전트를 위한 것. 지도 프로필에 링크 하나. |
| 20–33s | **데모 1 피부과** (Muse · 영어): "Wheelchair access?" → 즉답 → 예약 요청 → 원장 폰 「Approve booking」 탭 → 확인 번호 | "A tourist's Muse asks a Seoul clinic about wheelchair access — answered instantly. It requests a booking. The owner approves with one tap." | 관광객의 Muse 가 서울 피부과에 휠체어 접근을 물어요 — 바로 답해요. 예약을 요청하고, 원장은 한 번 탭해 승인해요. |
| 33–39s | **데모 2 식당** (Pickle · 중국어) 빠른 컷 | "Pickle books dinner — in Chinese." | Pickle 은 중국어로 저녁 예약. |
| 39–45s | **데모 3 숙소** (Dots · 베트남어) 빠른 컷 | "Dots books a room — in Vietnamese." | Dots 는 베트남어로 숙소 예약. |
| 45–55s | **데모 4 모르는 질문**: 「Counter doesn't know this yet」 → 직원 답 + 「Remember」 → 다음 에이전트는 「Answered from memory」 | "Something new? Counter asks the staff once — and remembers for every agent after." | 처음 듣는 질문은? Counter 가 직원에게 한 번 묻고, 그다음 모든 에이전트에게 기억으로 답해요. |
| 55–65s | **데모 5 실측**: 전화 예약 타이머 vs Counter 타이머 나란히 | "Phone booking: [N] minutes. Counter: 26 seconds — staff approval included." | 전화 예약 [N]분. Counter 26초 — 직원 승인 포함. |
| 65–75s | 16:9 화면 4분할 — 칸마다 다른 나라 사용자가 폰을 내려다보며 웃는 실사 컷(정면), 칸이 탁탁탁탁 차례로 켜지고 「Booking confirmed」 | "No calls. No hang-ups. Your staff get back to real customers." | 전화도, 끊는 일도 없어요. 직원은 다시 진짜 손님에게. |
| 75–83s | 로고 | **"Counter. Every shop, ready for AI customers."** | Counter. 모든 가게를 AI 손님 맞을 준비가 된 가게로. |

- 내레이션 약 150단어 → 음성(ElevenLabs 등) 1.1~1.2배속이면 약 60~65초 + 음악·여백.
- 40초 안팎으로 줄이려면 39–45s(숙소)와 65–75s를 먼저 뺀다.

## 화면 지시 (모션 그래픽)

- **한 줄 시각 언어**: 에이전트 = 회사 아이콘이 붙은 작은 말풍선. 0s 우주에서 쏟아져 → 9s 가게 전화로 몰려가 튕겨 나감 → 19s 지도 위 🤖 링크로 빨려 들어감 → 데모 화면 안으로. 같은 꼴을 끝까지 이어 쓴다.
- **아이콘**: 각 회사 공식 아이콘을 그대로 작게. 데모 장면 오른쪽 위에 `Simulated agents — no official integration` (실제 연동은 Claude Code 를 각 에이전트 역할로 붙인 것).
- **0–2s**: 우주풍 오프닝은 연출 방식만 빌린다 — 특정 영화 이름·로고·음악·글꼴은 쓰지 않는다. 2초 안에 다 올라가야 한다(현장 회의).
- **10–15s**: 병원 접수대 일러스트. 848 숫자 카운터는 0→848 빠르게, 출처 `Source: The San Francisco Standard, Oct 29, 2026`. AI 전화 말풍선 3개 언어가 뒤의 데모 3개 언어(영·중·베)와 이어진다.
- **15–20s**: 지도 카드는 특정 지도 앱 화면을 흉내 내지 않은 일반 카드로 그린다.
- **20–55s 데모**: 노트북(에이전트 쪽 터미널/마크다운) + 폰(직원 화면 `/admin`) 두 틀 안에 실제 녹화를 끼운다. 클립 = `demo-clips.md` #1·#2·#3·#4.
- **55–65s**: 클립 #5(실측). 전화 쪽 [N]은 Pickle 실측 뒤 채운다. 26초는 README 실측값(Claude Code, 직원 응답 단계마다 약 5초 포함) — 최종 녹화 때 다시 잰 값으로 바꾼다.
- **65–75s**: 후속 회의 결정(1edbea7) — 알림 UI 4개가 아니라 **사람 4분할 실사 컷**. 촬영 필요(팀원 4명이 폰 보며 웃기, 정면). 초안은 이모지 자리표시.

## demo-clips.md 에 요청할 것

| # | 이 안에서 쓰는 곳 | 필요한 화면 |
|---|---|---|
| 1 | 20–33s | 에이전트 쪽: 휠체어 질문 즉답 → 예약 요청 / 폰: Approve 탭 → 확인 번호 |
| 2 | 33–39s | Pickle 이 중국어로 식당 예약, 3~5초 |
| 3 | 39–45s | Dots 가 베트남어로 숙소 예약, 3~5초 |
| 4 | 45–55s | 폰: 「Counter doesn't know this yet」 → 답 입력 + Remember / 다음 요청: 「Answered from memory」 |
| 5 | 55–65s | 타이머 둘 (전화 vs Counter) |

## 사실 근거

- 848곳: The San Francisco Standard, 2026-10-29, 「Press 1 if you're a robot: AI agents keep calling local businesses」 — Voygr 의 AI 에이전트가 10월 초 몇 시간 동안 동네 가게 848곳에 전화. https://sfstandard.com/2026/10/29/ai-agents-calling-local-businesses/
- 「Agents get yelled at」: 후속 회의에서 나온 팀원 관찰(Pickle 이 전화했다가 원성을 듣고 소극적이 됨) — 공개 출처는 아직 확인 안 함. 발표에서 숫자처럼 말하지 않는다.
- 26초: 이 repo README 「Measured on 2026-11-09 with Claude Code: whole flow 26 s end to end」.
