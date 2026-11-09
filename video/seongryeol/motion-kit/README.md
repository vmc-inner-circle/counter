# 모션 그래픽 키트 (RealSnap 자체 제작, 13개)

RealSnap 광고용으로 만든 9:16(1080×1920) [HyperFrames](https://www.npmjs.com/package/hyperframes) 템플릿 모음이다.
잘 된 광고 연출만 참고해서 새로 짠 것이라 소스를 그대로 고쳐 써도 된다. Counter 영상에 필요한 걸 골라 문구·색·소재만 바꿔 쓰면 된다.

## 템플릿

| 폴더 | 길이 | 무엇 | 넣을 소재(`assets/slots/`) | 미리보기 |
|---|---|---|---|---|
| [`rs-diagonal-split`](pieces/rs-diagonal-split/) | 5.5초 | 대각선 비포/애프터 — 사선이 쓸고 지나가며 결과 공개 | before, after | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-diagonal-split.mp4) |
| [`rs-spring-wordmark`](pieces/rs-spring-wordmark/) | 5초 | 엔드카드 — 워드마크가 스프링으로 튀어 오르고 ! 점이 출렁 | 없음 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-spring-wordmark.mp4) |
| [`rs-flow-insert`](pieces/rs-flow-insert/) | 7초 | 흐름 도식 — 격자 위 노드 카드·화살표·체크(본 영상 사이 설명 컷) | 없음 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-flow-insert.mp4) |
| [`rs-grain-fluid`](pieces/rs-grain-fluid/) | 7초 | 색 점·그레인 덩어리가 비틀리는 배경 + 카피·로고 | 없음 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-grain-fluid.mp4) |
| [`rs-liquid-type`](pieces/rs-liquid-type/) | 9.5초 | 단어가 녹아 다른 서체의 다음 단어로 바뀌는 타이포 훅 | 없음 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-liquid-type.mp4) |
| [`rs-highlight-caption`](pieces/rs-highlight-caption/) | 10초 | 영상 컷 위 형광 박스 자막(쓸기 → 낱말 등장 → 빠짐) | clip-1..4 (mp4) | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-highlight-caption.mp4) |
| [`rs-zipper-reveal`](pieces/rs-zipper-reveal/) | 10초 | 원단 지퍼가 V자로 열리며 사진 공개 | photo-1, photo-2 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-zipper-reveal.mp4) |
| [`rs-kinetic-type`](pieces/rs-kinetic-type/) | 11초 | 비트마다 굵은 대문자 카피 슬램 → 단어 벽 → 실루엣 → 로고 | photo, bgm | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-kinetic-type.mp4) |
| [`rs-hanging-tags`](pieces/rs-hanging-tags/) | 11.5초 | 줄에 매달린 카드가 흔들리다 한 장씩 뒤집혀 사진 공개 | photo-1..5 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-hanging-tags.mp4) |
| [`rs-crt-type`](pieces/rs-crt-type/) | 13.5초 | 브라운관 화면에 번지는 글자·글리치·숫자 세기 → 로고 | 없음 | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-crt-type.mp4) |
| [`rs-weekday-lookbook`](pieces/rs-weekday-lookbook/) | 14초 | 요일 피커 UI — 날짜를 누르면 그날 영상 카드, 끝에 7칸 타일 | look-·key-·tile-(요일별), sfx | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-weekday-lookbook.mp4) |
| [`rs-screen-demo`](pieces/rs-screen-demo/) | 18초 | **앱 화면 녹화 위 카메라 줌·강조 박스·단계 칩·자막** — 데모 장면에 바로 쓸 만함 | screen.mp4(+첫/끝 프레임 jpg), before, after, sfx | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-screen-demo.mp4) |
| [`rs-chat-carousel`](pieces/rs-chat-carousel/) | 28초 | 채팅 훅 → 결과 카드 캐러셀(좋아요 숫자) → 원본/결과 → 타이틀 | input, out-1..7, bgm, sfx | [영상](https://d1v8ttuvmbmgis.cloudfront.net/history/motion-kit/realsnap/rs-chat-carousel.mp4) |

각 폴더의 `meta.json`에 쓰임·바꿀 수 있는 변수(`vars`)·소재 파일 이름(`slots`)·효과음 자리가 적혀 있다.

## 쓰는 법

```bash
# 1) 템플릿 하나와 공용 brand/ 를 작업 폴더로 복사 (index.html 옆에 brand/ 가 있어야 한다)
mkdir -p ~/my-motion && cp -R pieces/rs-screen-demo/. ~/my-motion/ && cp -R brand ~/my-motion/
cd ~/my-motion

# 2) 소재가 필요한 템플릿이면 meta.json 의 slots 이름대로 assets/slots/ 에 넣는다
#    (예시 사진·영상은 용량·초상권 때문에 저장소에 없다 — 우리 화면 녹화·사진으로 채운다)

# 3) 미리보기 · 검사 · 렌더
npx --yes hyperframes@0.8.6 preview      # 브라우저 스튜디오
npx --yes hyperframes@0.8.6 lint
npx --yes hyperframes@0.8.6 render       # mp4
```

- 문구·색은 `index.html`의 `data-composition-variables` 기본값을 고치거나 렌더 때 `--variables`로 넘긴다.
- 로고는 `brand/realsnap-logo.png`다. Counter 영상에 쓸 땐 Counter 로고로 바꾸거나 변수 `logo`를 끈다.
- Claude Code에 맡길 때: "video/seongryeol/motion-kit 의 rs-xxx 를 Counter 문구로 바꿔서 렌더해줘"라고 하면 된다.

## 폴더

- `pieces/<id>/` — 템플릿 하나(`index.html` 컴포지션 + `meta.json`)
- `brand/` — 공용: `rs-motion.js`(변수 읽기·seek 안전 도우미), `gsap.min.js`(GreenSock 표준 라이선스), `PretendardVariable.woff2`, `fonts/`(Anton·Archivo Black·Bebas Neue·DM Serif Display·Fraunces·IBM Plex Mono·Oswald·Playfair Display, 모두 SIL OFL 1.1 — 고지는 `fonts/OFL.txt`), `realsnap-logo.png`
