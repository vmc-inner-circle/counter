# 사장님 화면 다듬기 — 시안 1~3

11/09 최수민 "좀 더 예쁘면 좋겠다". **시안 1 Clean으로 확정, 탭바 아이콘을 더해 `app/public/admin.html`에 반영함.** 구조(시안 A 채널톡형)는 그대로 두고 **스타일만** 바꾼 비교안이다. 각 CSS를 실제 `app/public/admin.html`에 덧입혀 같은 데이터(Emma·Wei Chen·Dots)·같은 해상도(432×768 @2x)로 캡처했다.
장면: ① 목록 ② Emma 대화 — 승인 대기 ③ 승인 후 답장 입력 ④ Dots — 기억으로 즉답

| 시안 | 방향 | 이미지 |
|---|---|---|
| 0 지금 | 기준 | [0-now.png](0-now.png) |
| 1 Clean | 장식 없이 위계만 — 큰 제목, 밑줄 탭, 예약 일시 28px, Approve 크게·Decline은 글자 | [1-clean.css](1-clean.css) · [1-clean.png](1-clean.png) |
| 2 Warm | 영상팀 모션그래픽 톤 — Pretendard, 크림 `#F6F5F0`, 주황 `#FF6B3D`, 검정 알약 버튼, 대화를 카드로 | [2-warm.css](2-warm.css) · [2-warm.png](2-warm.png) |
| 3 Dark | 영상 임팩트 — 어두운 바탕, 예약을 티켓처럼(점선), Approve는 초록 발광 | [3-dark.css](3-dark.css) · [3-dark.png](3-dark.png) |

| | 1 Clean | 2 Warm | 3 Dark |
|---|---|---|---|
| 영상과 이어짐 | 파랑 — 영상 C1 워크플로우 색과 같음 | **영상 크림 톤과 같은 화면처럼 이어짐** | 크림 영상 사이에서 튐(전환 강조로 쓸 수도) |
| 9:16 녹화 가독성 | 좋음 | 좋음 | 가장 좋음(대비) |
| 막히는 점 | 지금과 차이가 작아 "예뻐졌다" 체감이 약할 수 있음 | Pretendard 파일(약 4MB)을 `app/public/fonts`로 옮겨야 함. 대화를 카드로 나눠 위계 카드(`kca43f612e9`)와 어긋남 | 그라데이션·발광은 장식 — 영상 임팩트 목적일 때만 허용되는 예외 |
| 반영 시간(추정, 미검증) | 10분 | 15분 | 10분 |

고르면 그 CSS를 `admin.html`에 합치고 `python3 app/demo/record.py`로 클립을 다시 뽑는다.
