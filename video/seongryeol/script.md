# v7 대본 — 가게 중심 (90초, 영어)

내레이션: Gemini TTS 여성(Kore) 1.2배속. 손님 음성: Emma(영어)·Wei(중국어)·Lucía(스페인어), 원속도.
기준: [docs/use-cases.md](../../docs/use-cases.md) UC-1~3. 비행기 컨셉은 회의에서 기각돼 뺐다.

| 시간 | 장면 | 화면 | 소리 |
|---|---|---|---|
| 0:00–0:02 | 훅 | 바쁜 데스크 위로 Muse·Grok Bot·Pickle·Dots "incoming call" 알림 폭주 → **Who picks up?** | 전화벨 |
| 0:02–0:06 | 손님 요청 | 공항 게이트의 Emma | Emma: "Hey Muse — book me a skin clinic in Seoul for when I land." |
| 0:06–0:10 | 문제 | 100칸 그리드, 한 칸만 초록 — "Agents call 100 clinics at once. Each clinic has one phone line." | Her agent calls a hundred clinics at once. Each has one phone line. |
| 0:10–0:16 | 비교 | 위: AI → Human(벨·부재중·보류·다시 전화) / 아래: AI → AI(`/s/soi-derm` → 즉시 ✓) | AI calling humans: missed, on hold, call back later. AI talking to AI: done in seconds. |
| 0:16–0:22 | 서비스 소개 | 에이전트 4종 → `/s/soi-derm` 링크 → 가게·직원 폰, 하는 일 01~03 → 지도 정보에 전화번호 옆 "AI AGENTS" 줄 | Counter gives every shop one link for AI agents — right next to its phone number. |
| 0:22–0:36 | 챕터 01~03 | 터미널(Muse = Claude Code가 `curl /s/soi-derm.md` → `POST /ask` 세금 환급 → completed / 캐리어 보관 → input-required / `POST /book` 15:00 → slot held) + 오른쪽 "What agents read" 가게 정보 | One: it answers what it knows… / Two: what it doesn't know, it asks the staff once. / Three: bookings are held until a human approves. |
| 0:36–0:48 | 전 세계 | 지구본(7개 도시 → 서울) → Wei·Lucía가 모국어로 자기 에이전트에게, 에이전트는 Counter와 영어로 | Muse, Pickle, Grok Bot — agents from everywhere. + Wei·Lucía 음성 |
| 0:48–1:02 | 사장님 | 실제 `/admin` 화면 재현 폰 3대: 피부과 Approve booking(SOI-1110-1500) · 호텔 Approve · 식당 모르는 질문 답변 + Remember → 다음 에이전트(Dots)는 기억으로 즉답 | The owner just taps to approve. / Answer once — Counter remembers it for the next agent. |
| 1:02–1:07 | 실측 | **26s** end to end(README 참고치, Claude Code) · 전화 0 · 직원 탭 2 | Measured end to end: twenty-six seconds. |
| 1:07–1:17 | 완료 | 4컷 → 4분할(Emma·Wei·Lucía·Yui 각 언어 확정 알림) | Four guests. Four agents. Four languages. / And the shop never picked up a phone. |
| 1:17–1:30 | 엔드 | 가게 3곳 연락처 카드(PHONE + AI AGENTS 링크) → **Counter.** "Phones are for people. Counter is for agents." | Phones are for people. Counter is for agents. |

## 남은 것
- S2 비교 시계(4:12 vs 1.2s)는 연출 값 — [measurement.md](../../docs/measurement.md) 실측 나오면 교체
- 터미널·사장님 화면은 실제 디자인 재현 — demo-clips 녹화 오면 교체
- 전화벨 효과음 CC BY 3.0(Freesound djfroyd) 크레딧 필요
