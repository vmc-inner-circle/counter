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

- **무엇을 만들고 무엇을 찍는지는 [`docs/use-cases.md`](docs/use-cases.md)가 기준이다.** 대본, 데모 녹화, 빌드, 실측 모두 `UC-1`처럼 번호로 부른다. 바꾸려면 싱크에서 정한 뒤 이 문서부터 고친다
- 회의 결정은 [`docs/`](docs/README.md), 영상 작업 규칙은 [`video/README.md`](video/README.md)를 본다

## 3. 고치는 범위

- 영상팀은 `video/` 아래 **자기 폴더만** 고친다. `video/common/`과 `docs/use-cases.md`는 싱크에서 정한 것만 올린다
- 커밋할 때는 자기가 고친 파일만 경로로 지정해서 올린다(`git add -A` 금지)
