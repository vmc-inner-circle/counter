# 데모 장면 목록

영상의 데모 플레이스홀더를 여기서 맞춘다. 영상팀이 필요한 장면을 적으면, 빌드 쪽이 [`app/demo/record.py`](../app/demo/record.py)에 대본으로 추가해 **자동 녹화**한 클립을 [`demo-clips/`](demo-clips/)에 올린다(손으로 녹화하지 않는다). 제품이 바뀌면 같은 명령으로 전부 다시 뽑으니, 클립은 늘 최신 제품 화면이다.

- 형식: mp4, 1080×1920(9:16), 30fps. 탭한 곳에 회색 원이 뜬다
- 다시 뽑기: `python3 app/demo/record.py` (전체 약 1분) · 한 장면만: `python3 app/demo/record.py uc3-approve` · 손님 바꾸기: `--agent Pickle --user "Wei Chen"`
- 장면 추가 요청: 아래 표에 "무엇이 몇 초 동안 보여야 하는지"를 적는다
 #1~3은 [유스케이스](../docs/use-cases.md)의 데모 시나리오(피부과·식당·숙소), #4는 UC-2, #5는 [실측 계획](../docs/measurement.md)을 따른다.

| # | 장면 | 요청한 사람 | 영상 위치(초) | 클립 링크 | 상태 |
|---|---|---|---|---|---|
| 1 | 피부과 — Muse(영어)가 Counter에 문의·예약, 원장 폰에서 승인 | 조순형 | 36–48 (v2 draft) | 사장님 탭: [uc3-approve](demo-clips/uc3-approve.mp4) 7.8s | 사장님 화면 완료 · 손님 에이전트 쪽 준비 중 |
| 2 | 식당 — Pickle(중국어) 예약 | 조순형 | 48–60 (v2 draft, 사장님 탭 포함) | | 준비 중 |
| 3 | 숙소 — Dots(베트남어) 예약 | 조순형 | 60–71 (v2 draft) | | 준비 중 |
| 4 | 모르는 질문 → 직원 답변 → "기억할까요?" → 다음 문의는 즉답 | | | [uc2-answer](demo-clips/uc2-answer.mp4) 10.8s · [uc2-memory](demo-clips/uc2-memory.mp4) 5.8s | 사장님 화면 완료 |
| 5 | 실측 비교: 전화 예약 vs Counter 소요 시간 | | | | 준비 중 |

## 지금 있는 클립

| 파일 | 길이 | 보이는 것 |
|---|---|---|
| [uc2-answer.mp4](demo-clips/uc2-answer.mp4) | 10.8s | 사장님 폰: Muse의 모르는 질문이 들어옴 → 답을 입력 → "기억" 켠 채 보냄 |
| [uc2-memory.mp4](demo-clips/uc2-memory.mp4) | 5.8s | 사장님 폰: Pickle이 같은 질문 → 사장님 손 안 대고 "Answered from memory" |
| [uc3-approve.mp4](demo-clips/uc3-approve.mp4) | 7.8s | 사장님 폰: Muse의 예약 요청(슬롯 잡아 둠) → Approve 탭 → 확정번호 |
| [full.mp4](demo-clips/full.mp4) | 24.8s | 위 셋을 한 번에 |

손님 에이전트 쪽 화면(가게 웹페이지에서 예약 폼을 채우는 장면)은 예약 폼을 만든 뒤 추가한다.
