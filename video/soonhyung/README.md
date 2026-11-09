# 조순형 — 영상 안

## 영상 초안

| 버전 | 시각 | 링크 | 바뀐 점 |
|---|---|---|---|
| v1 | 11/09 11:06 | (나레이션형, 폐기) | 검정 배경 + 나레이션 + 자막. 레퍼런스 톤과 달라 접음 |
| v2 draft | 11/09 11:36 | 링크: 업로드 후 기입 | 나레이션 없음 · BGM + 화면 텍스트 · 크림 바탕 모션그래픽 · 한국어판/영어판 각 89초 |

레퍼런스: [Notion 3.0 한국 론칭 영상](https://youtu.be/rfU_yL-oc80) — 나레이션 없이 BGM, 흰 바탕, 큰 타이포, 캐릭터 말풍선, 실제 UI 카드.

## 구성 (89초)

| 구간 | 시간 | 내용 |
|---|---|---|
| A 인트로 | 0–6 | 로고 클릭 → "이제 손님은 에이전트입니다" |
| B 페인 | 6–31 | Muse·Pickle·Dots가 심부름 받음 → 100곳 동시 전화 → 사장님 "또 AI야?" → 손님이 Pickle을 혼냄, Pickle 울상 → "가게도, 에이전트도 전화가 괴롭다" |
| C 해결 | 31–75 | COUNTER 등장 → 피부과(영어·Muse) → 식당(중국어·Pickle, 사장님 탭 한 번) → 숙소(베트남어·Dots) → 세 카드 풀백 "전화 한 통 없이" |
| D 클로징 | 75–89 | 사장님 "오늘 문의 18건, 받은 전화 0통" → Pickle 웃음 → "Every shop, ready for AI customers." → 로고 |

대본·컷별 콘티: [`script.md`](script.md) · 정지 프레임: [`stills_ko.png`](stills_ko.png) · [`stills_en.png`](stills_en.png)

## 유스케이스 대조 — v2.1에서 고칠 것 (`docs/use-cases.md` 기준)

- 현재 v2는 에이전트↔Counter 대화를 사용자 언어(중국어·베트남어)로 그렸다. 유스케이스는 **에이전트↔Counter는 영어**, 언어는 사용자↔에이전트 사이의 일 → 카드 상단에 사용자의 모국어 요청 한 줄, 그 아래 영어 Q&A로 바꾼다
- 피부과 시나리오를 확정안(휠체어 쓰는 영국인 Emma · 접근성 즉답 UC-1 · "여성 의사?" 직원 답변 후 기억 UC-2 · 예약 승인 UC-3)으로 맞춘다
- 식당·숙소 가게 이름은 미정이라 가칭(한옥집 식당·남산 게스트하우스)을 썼다
- 데모 카드는 코드로 그린 목업. `demo-clips.md` #1~3 녹화가 나오면 그 자리에 넣는다

## 만드는 법

`build/` 한 폴더. HTML 한 장이 `seek(t)`로 모든 프레임을 그리고, Playwright가 캡처해 ffmpeg로 묶는다 ([Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics)의 `explainer-default` 방식).

```bash
cd build && npm i && npx playwright install chromium
open demo_ko.html            # 브라우저에서 재생·스크럽
npm run stills               # 정지 프레임 검수
npm run draft                # 30fps 드래프트 (약 30초)
npm run final                # 60fps + 모션블러 (수십 분)
```

- 한국어판 `demo_ko.html` / 영어판 `demo_en.html` — `const LANG` 한 줄만 다르다
- 소재: `assets/` (캐릭터·BGM·효과음), 폰트 `fonts/` (Pretendard, OFL)
- BGM: ElevenLabs Music 생성 (팀 보유 계정) · 효과음: motion-graphics 번들 CC0 kit · Pickle 이미지: Google Play 아이콘(순형 승인) · 사장님 캐릭터: 생성 이미지
- 음량: 드래프트 측정 -16.9 LUFS, 피크 -0.8 dBFS

## 코멘트

<!-- 다른 팀원 의견은 여기 한 줄씩: "- 이름: 의견" -->
