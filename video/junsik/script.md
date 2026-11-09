# 황준식 안 — 대본·화면 지시서 v3

- 만든 때: 2026-11-09 11시경 (황준식 + Claude)
- 기준: 11/09 현장 R&R·스펙 회의, 후속 데모 시나리오·영상 흐름 회의, Notion Kickoff 「System Demo Scenarios」, `server.mjs` 데모(f2d442b)
- 형식: **모션 그래픽** + 데모 녹화(플레이스홀더 → `../demo-clips.md` 번호)
- 흐름(후속 회의 결정): 인트로 ~10초 → 문제 → 솔루션 = 시스템 데모 ~35초 → 클로징

## 대본 (영어 내레이션 = 자막)

| 시간 | 장면 | 내레이션 (EN) | 한국어 뜻 |
|---|---|---|---|
| 0–2s | 우주, 노란 글자가 비스듬히 멀어짐 | *(글자만)* **The Agent Invasion Has Begun.** | 에이전트들의 침공이 시작되었다. |
| 2–9s | Muse·Pickle·Grok·Claude Duet 아이콘이 지구 위로 쏟아져 사람마다 하나씩 붙음 | "Every AI company is racing to give a billion people their own agent." | 모든 AI 회사가 10억 명에게 각자의 에이전트를 쥐여 주려고 경쟁 중이에요. |
| 9–19s | 바쁜 식당. 전화가 쉬지 않고 울림 → 사장님이 받으면 "Hi, I'm an AI assistant calling on behalf of…" → 한숨, 수화기 내려놓음. 지도 위 가게 점 848개가 차례로 울림 | "And they all call the same small shops. One AI agent called 848 local businesses in a few hours. Owners hang up. Agents get yelled at." | 그리고 그 에이전트들이 모두 같은 작은 가게에 전화해요. AI 에이전트 하나가 몇 시간 만에 동네 가게 848곳에 전화했어요. 사장님은 끊고, 에이전트는 혼나요. |
| 19–27s | 전화기 아이콘 위에 X → 구글맵 가게 카드 연락처에 📞 아래 🤖 `Agent: …/s/soi-derm` 이 떠오름 | "Phones are for people. Counter is for agents. One link on your map listing — an agent-native contact point." | 전화는 사람을 위한 것. Counter 는 에이전트를 위한 것. 지도 프로필에 링크 하나 — 에이전트 네이티브 컨택 포인트. |
| 27–40s | **데모 1 피부과** (Muse · 영어): "Wheelchair access?" → 즉답 → 예약 요청 → 원장 폰 「Approve booking」 탭 → 확인 번호 | "A tourist's Muse asks a Seoul clinic about wheelchair access — answered instantly. It requests a booking. The owner approves with one tap." | 관광객의 Muse 가 서울 피부과에 휠체어 접근을 물어요 — 바로 답해요. 예약을 요청하고, 원장은 한 번 탭해 승인해요. |
| 40–46s | **데모 2 식당** (Pickle · 중국어) 빠른 컷 | "Pickle books dinner — in Chinese." | Pickle 은 중국어로 저녁 예약. |
| 46–52s | **데모 3 숙소** (Grok · 베트남어) 빠른 컷 | "Grok books a room — in Vietnamese." | Grok 은 베트남어로 숙소 예약. |
| 52–62s | **데모 4 모르는 질문**: 「Counter doesn't know this yet」 → 직원 답 + 「Remember」 → 다음 에이전트는 「Answered from memory」 | "Something new? Counter asks the staff once — and remembers for every agent after." | 처음 듣는 질문은? Counter 가 직원에게 한 번 묻고, 그다음 모든 에이전트에게 기억으로 답해요. |
| 62–72s | **데모 5 실측**: 전화 예약 타이머 vs Counter 타이머 나란히 | "Phone booking: [N] minutes. Counter: 26 seconds — staff approval included." | 전화 예약 [N]분. Counter 26초 — 직원 승인 포함. |
| 72–82s | 폰 네 대에 「Booking confirmed」 알림이 탁탁탁탁, 사람들이 웃으며 봄 | "No calls. No hang-ups. Your staff get back to real customers." | 전화도, 끊는 일도 없어요. 직원은 다시 진짜 손님에게. |
| 82–90s | 로고 | **"Counter. Every shop, ready for AI customers."** | Counter. 모든 가게를 AI 손님 맞을 준비가 된 가게로. |

- 내레이션 약 150단어 → 음성(ElevenLabs 등) 1.1~1.2배속이면 약 60~65초 + 음악·여백.
- 40초 안팎으로 줄이려면 46–52s(숙소)와 72–82s를 먼저 뺀다.

## 화면 지시 (모션 그래픽)

- **한 줄 시각 언어**: 에이전트 = 회사 아이콘이 붙은 작은 말풍선. 0s 우주에서 쏟아져 → 9s 가게 전화로 몰려가 튕겨 나감 → 19s 지도 위 🤖 링크로 빨려 들어감 → 데모 화면 안으로. 같은 꼴을 끝까지 이어 쓴다.
- **아이콘**: 각 회사 공식 아이콘을 그대로 작게. 데모 장면 오른쪽 위에 `Simulated agents — no official integration` (실제 연동은 Claude Code 를 각 에이전트 역할로 붙인 것).
- **0–2s**: 우주풍 오프닝은 연출 방식만 빌린다 — 특정 영화 이름·로고·음악·글꼴은 쓰지 않는다. 2초 안에 다 올라가야 한다(현장 회의).
- **9–19s**: 바쁜 식당은 일러스트. 848 숫자 카운터는 0→848 빠르게. 화면 아래 출처 `Source: The San Francisco Standard, Oct 29, 2026`.
- **19–27s**: 지도 카드는 특정 지도 앱 화면을 흉내 내지 않은 일반 카드로 그린다.
- **27–62s 데모**: 노트북(에이전트 쪽 터미널/마크다운) + 폰(직원 화면 `/admin`) 두 틀 안에 실제 녹화를 끼운다. 클립 = `demo-clips.md` #1·#2·#3·#4.
- **62–72s**: 클립 #5(실측). 전화 쪽 [N]은 Pickle 실측 뒤 채운다. 26초는 README 실측값(Claude Code, 직원 응답 단계마다 약 5초 포함) — 최종 녹화 때 다시 잰 값으로 바꾼다.
- **72–82s**: 후속 회의 엔딩 아이디어 — 예약 완료 알림 네 개.

## demo-clips.md 에 요청할 것

| # | 이 안에서 쓰는 곳 | 필요한 화면 |
|---|---|---|
| 1 | 27–40s | 에이전트 쪽: 휠체어 질문 즉답 → 예약 요청 / 폰: Approve 탭 → 확인 번호 |
| 2 | 40–46s | Pickle 이 중국어로 식당 예약, 3~5초 |
| 3 | 46–52s | Grok 이 베트남어로 숙소 예약, 3~5초 |
| 4 | 52–62s | 폰: 「Counter doesn't know this yet」 → 답 입력 + Remember / 다음 요청: 「Answered from memory」 |
| 5 | 62–72s | 타이머 둘 (전화 vs Counter) |

## 사실 근거

- 848곳: The San Francisco Standard, 2026-10-29, 「Press 1 if you're a robot: AI agents keep calling local businesses」 — Voygr 의 AI 에이전트가 10월 초 몇 시간 동안 동네 가게 848곳에 전화. https://sfstandard.com/2026/10/29/ai-agents-calling-local-businesses/
- 「Agents get yelled at」: 후속 회의에서 나온 팀원 관찰(Pickle 이 전화했다가 원성을 듣고 소극적이 됨) — 공개 출처는 아직 확인 안 함. 발표에서 숫자처럼 말하지 않는다.
- 26초: 이 repo README 「Measured on 2026-11-09 with Claude Code: whole flow 26 s end to end」.
