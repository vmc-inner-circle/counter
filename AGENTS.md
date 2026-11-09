# Counter repo 작업 규칙

사람이든 AI 에이전트(Claude Code 등)든 이 repo에서 일할 때 따른다.

## 1. 작업을 시작하기 전에 항상 main을 최신으로 받는다

여러 명이 main에 바로 올리고 있다. 오래된 내용 위에서 작업하면 남이 바꾼 결정을 놓치고 충돌이 난다.

```bash
git pull --rebase origin main
```

- **작업을 시작할 때마다** 실행한다. 이전 세션이나 몇 분 전에 받았어도 다시 받는다
- **push 직전에도 한 번 더** 실행한다. 충돌이 나면 덮어쓰지 말고 풀어서 올린다. `git push -f`는 쓰지 않는다
- 브라우저로 올릴 때도 편집 전에 페이지를 새로고침해 최신 내용을 본다

## 2. 기준 문서

- **무엇을 만들고 무엇을 찍는지는 [`docs/use-cases.md`](docs/use-cases.md)가 기준이다.** 대본, 데모 녹화, 빌드 모두 유스케이스 번호(`UC-1`)와 시나리오 이름(`피부과`)으로 부른다. 실측은 [`docs/measurement.md`](docs/measurement.md). 바꾸려면 싱크에서 정한 뒤 이 문서부터 고친다
- 회의 결정은 [`docs/`](docs/README.md), 영상 작업 규칙은 [`video/README.md`](video/README.md)를 본다

## 3. 고치는 범위

- **앱(빌드) 코드는 [`app/`](app/) 안에만 둔다.** 제품 코드는 이 폴더 하나다. 루트·`docs/`·`video/`에 실행 코드를 두지 않는다
- **11/09 13시 이후 빌드는 "데모가 엔드투엔드로 동작" + 디자인 손보기(프라이머리 컬러·로고)까지만 한다.** 새 기능을 붙이지 않는다. 영상에 심사위원용 QR·링크를 넣지 않는다 — 한두 건으로는 Counter가 안 보이고 "AI 캐치테이블"로 오해된다 ([상시녹음 3](docs/meeting-logs/261109_상시녹음3-영상방향-데모범위.md)). 라이브 주소는 README에만 둔다(13:30 최수민 — 있어서 손해 볼 것 없다)
- **배포:** Fly.io `counter-agent`(도쿄), `cd app && fly deploy`. 배포본은 실제 병원(닥터디자이너의원 영등포점) 공개 정보 `app/data/seed-drd.json`을 쓰고, 영상·클립은 `seed.json`을 그대로 쓴다. 검색 노출은 막아 둔다(noindex·robots.txt)
- **화면을 바꾸면 `python3 app/demo/record.py`로 시연 클립을 다시 뽑아 같이 올린다.** 영상팀은 [`video/demo-clips/`](video/demo-clips.md)의 클립을 쓰고 손으로 녹화하지 않는다
- 영상팀은 `video/` 아래 **자기 폴더만** 고친다. `video/common/`과 `docs/use-cases.md`는 싱크에서 정한 것만 올린다
- 커밋할 때는 자기가 고친 파일만 경로로 지정해서 올린다(`git add -A` 금지)
