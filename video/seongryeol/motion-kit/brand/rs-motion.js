/* RealSnap 모션 키트 런타임 — HyperFrames 컴포지션 공용(GSAP 3, paused + seek 안전).
   불러오는 순서: brand/gsap.min.js → brand/rs-motion.js → 작품 스크립트.
   RS.vars(defaults)              data-composition-variables / --variables 를 기본값 위에 합친다
   RS.sample(tl, at, dur, fn, e)  매 렌더마다 fn(진행도 0~1). onUpdate 는 seek 에서 건너뛰어질 수 있어 플러그인으로 부른다
   RS.clamp / RS.lerp / RS.ease   계산 도우미(Math.random·Date 를 쓰지 않는다 — 같은 t 면 같은 화면)
   RS.ready(imgs)                 글꼴·이미지가 다 준비되면 resolve
*/
(() => {
  const RS = (window.RS = {});

  RS.vars = (defaults) => {
    let v = {};
    try {
      const hf = window.__hyperframes;
      if (hf && typeof hf.getVariables === "function") v = hf.getVariables() || {};
    } catch (e) {
      v = {};
    }
    return Object.assign({}, defaults || {}, v);
  };

  const SAMPLERS = [];
  if (window.gsap) {
    gsap.registerPlugin({
      name: "rsSample",
      init(target, id) {
        this.fn = SAMPLERS[id];
      },
      render(ratio, data) {
        data.fn(ratio);
      },
    });
  }
  RS.sample = (tl, at, dur, fn, ease) => {
    tl.to({}, { rsSample: SAMPLERS.push(fn) - 1, duration: dur, ease: ease || "none" }, at);
    return at + dur;
  };

  RS.clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  RS.lerp = (a, b, p) => a + (b - a) * p;
  // 0~1 구간 이징(gsap.parseEase 와 같은 이름) — 구간 계산을 한 곳에서 하려고
  RS.ease = (name) => gsap.parseEase(name);
  // t 가 [a, b] 사이일 때 0→1, 이징 적용
  RS.seg = (t, a, b, ease) => {
    const p = RS.clamp((t - a) / (b - a));
    return ease ? RS.ease(ease)(p) : p;
  };

  RS.ready = (imgs) =>
    Promise.all([
      document.fonts.ready,
      ...(imgs || []).map((img) => (img.complete && img.naturalWidth ? Promise.resolve() : img.decode().catch(() => {}))),
    ]);
})();
