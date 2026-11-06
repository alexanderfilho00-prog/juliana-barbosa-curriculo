/**
 * Movimento — GSAP (core + timeline + ScrollTrigger + CustomEase).
 *
 * Intenção (guiada pelo vídeo de referência): um único momento coreografado
 * na entrada do hero; o resto da página respira. Só títulos e stickers
 * aparecem na rolagem; parágrafos, cartões e listas ficam parados para leitura.
 *
 * Curvas e durações seguem a skill animate (Emil Kowalski):
 *  - entradas: ease-out forte cubic-bezier(0.23, 1, 0.32, 1)
 *  - deslocamento na tela: ease-in-out cubic-bezier(0.77, 0, 0.175, 1)
 *  - movimento constante (selo, letreiro): linear
 *  - nada nasce de scale(0); stagger entre 30 e 80 ms
 * Movimento reduzido: mesma ordem, só fades curtos, sem loops nem deslocamento.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
window.__jbMotion = true;

CustomEase.create("out", "0.23, 1, 0.32, 1");
CustomEase.create("inOut", "0.77, 0, 0.175, 1");

const q = (sel, ctx = document) => ctx.querySelector(sel);
const qa = (sel, ctx = document) => gsap.utils.toArray(sel, ctx);

/* ---------- entrada do hero: nome → palavra → apresentação → retrato → detalhes ---------- */
function heroTimeline() {
  const tl = gsap.timeline({ defaults: { ease: "out", duration: 0.8 } });

  tl.addLabel("name", 0.1)
    // "Juliana": cada letra sobe e abre da largura condensada para a expandida
    .fromTo(qa('[data-hero="first"] .c'),
      { autoAlpha: 0, yPercent: 35, fontVariationSettings: '"wdth" 62' },
      { autoAlpha: 1, yPercent: 0, fontVariationSettings: '"wdth" 125', duration: 0.9, stagger: 0.05, clearProps: "fontVariationSettings" },
      "name")
    .fromTo('[data-hero="last"]',
      { autoAlpha: 0, x: 48 },
      { autoAlpha: 1, x: 0, duration: 0.9 },
      "name+=0.3")

    .addLabel("intro", "name+=0.6")
    .fromTo('.rotator-line', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "intro")
    .fromTo('[data-hero="rule"]', { autoAlpha: 0, scaleX: 0.2 }, { autoAlpha: 1, scaleX: 1, duration: 0.7, ease: "inOut" }, "intro+=0.08")
    .fromTo('.hero__intro > *', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, "intro+=0.12")
    .set('.hero__intro', { autoAlpha: 1 }, "intro+=0.12")

    .addLabel("photo", "name+=0.45")
    .fromTo('[data-hero="photo"]',
      { autoAlpha: 0, scale: 0.94, rotation: -3 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 1 },
      "photo")

    .addLabel("details", "photo+=0.55")
    .fromTo('[data-hero="detail"]',
      { autoAlpha: 0, scale: 0.9, rotation: -10 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.6)" },
      "details")
    .fromTo('.hand-arrow__line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "inOut" }, "details+=0.15")
    .fromTo('.hand-arrow__head', { opacity: 0 }, { opacity: 1, duration: 0.2 }, ">-0.05")
    .call(() => q(".hero .marker")?.classList.add("is-drawn"), null, "intro+=0.3");

  return tl;
}

/* ---------- alternância de palavras (caixa com tamanho fixo) ---------- */
function rotator(heroTl) {
  const box = q(".rotator");
  if (!box) return;
  const words = JSON.parse(box.dataset.words);
  const text = q(".rotator__text", box);
  const MAX_CYCLES = 4; // depois disso, para em "brand strategy"
  let wi = 0, ci = words[0].length, deleting = false, cycles = 0, call = null, done = false;

  const next = (s) => { call = gsap.delayedCall(s, tick); };
  function tick() {
    const w = words[wi];
    if (!deleting) {
      if (ci < w.length) { text.textContent = w.slice(0, ++ci); return next(0.065); }
      if (cycles >= MAX_CYCLES && wi === 1) { done = true; box.classList.add("is-done"); return; }
      deleting = true;
      return next(1.9); // pausa de leitura
    }
    if (ci > 0) { text.textContent = w.slice(0, --ci); return next(0.035); }
    deleting = false;
    wi = (wi + 1) % words.length;
    if (wi === 0) cycles++;
    next(0.3);
  }
  // começa quando a entrada termina; pausa fora da tela
  heroTl.call(() => next(1.2));
  ScrollTrigger.create({
    trigger: box, start: "top bottom", end: "bottom top",
    onToggle: (self) => { if (done || !call) return; self.isActive ? call.resume() : call.pause(); },
  });
}

/* ---------- selo girando devagar (só visível) ---------- */
function badge() {
  const spin = gsap.to(".badge__spin", { rotation: 360, svgOrigin: "100 100", duration: 28, ease: "none", repeat: -1, paused: true });
  ScrollTrigger.create({ trigger: ".hero__badge", start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? spin.play() : spin.pause()) });
}

/* ---------- stickers 3D: pequenas rotações ociosas na imagem interna
   (a entrada anima o invólucro; o hover usa rotate/scale em CSS) ---------- */
function idleStickers() {
  qa(".obj__img").forEach((el, i) => {
    const dir = i % 2 ? 1 : -1;
    const tw = gsap.to(el, {
      rotation: dir * gsap.utils.random(3, 5),
      y: -6,
      duration: gsap.utils.random(2.6, 3.6),
      ease: "sine.inOut", yoyo: true, repeat: -1, paused: true,
      delay: gsap.utils.random(0, 1),
    });
    ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });
}

/* ---------- stickers das seções: colam ao entrar ---------- */
function stickersOnScroll() {
  ScrollTrigger.batch("[data-sticker]", {
    start: "top 88%", once: true,
    onEnter: (batch) => gsap.fromTo(batch,
      { autoAlpha: 0, scale: 0.9, rotation: -12 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.08 }),
  });
}

/* ---------- títulos surgem na rolagem ---------- */
function titles() {
  qa("[data-split]").forEach((line) => {
    const heading = line.closest("h2") || line;
    const follow = qa("[data-follow]", heading);
    const tl = gsap.timeline({
      defaults: { ease: "out" },
      scrollTrigger: { trigger: heading, start: "top 85%", once: true },
    });
    tl.fromTo(qa(".c", line), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.025 });
    if (follow.length) tl.fromTo(follow, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.45");
  });
  // linhas que acompanham títulos sem letras divididas (repertório)
  qa("[data-follow]").forEach((el) => {
    if (el.closest("h2")?.querySelector("[data-split]")) return;
    gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
}

/* ---------- letreiros: movimento constante, linear ---------- */
function marquees() {
  qa("[data-marquee]").forEach((m) => {
    const dir = +m.dataset.marquee;
    const track = q(".marquee__track", m);
    const tw = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 38, ease: "none", repeat: -1, paused: true });
    ScrollTrigger.create({ trigger: m, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });
}

/* ---------- leitura de progresso + leve deriva do sobrenome ---------- */
function scrollLinked() {
  gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  gsap.to(".hero__last", { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 } });
}

/* ---------- movimento reduzido: mesma ordem, só fades curtos ---------- */
function reduced() {
  gsap.timeline({ defaults: { duration: 0.25, ease: "none" } })
    .to('[data-hero="first"] .c, [data-hero="last"]', { autoAlpha: 1 })
    .to('.rotator-line, [data-hero="rule"], .hero__intro, .hero__intro > *', { autoAlpha: 1 }, "<0.1")
    .to('[data-hero="photo"], [data-hero="detail"]', { autoAlpha: 1 }, "<0.1")
    .set(".hand-arrow__line", { strokeDashoffset: 0 })
    .set(".hand-arrow__head", { opacity: 1 });
  q(".rotator")?.classList.add("is-done");
  ScrollTrigger.batch("[data-split] .c, [data-follow], [data-sticker]", {
    start: "top 92%", once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, duration: 0.25, ease: "none" }),
  });
}

const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
  if (ctx.conditions.reduce) { reduced(); return; }
  const tl = heroTimeline();
  rotator(tl);
  badge();
  idleStickers();
  stickersOnScroll();
  titles();
  marquees();
  scrollLinked();
});

// fontes alteram a altura dos títulos: recalcula os gatilhos quando carregarem
document.fonts?.ready.then(() => ScrollTrigger.refresh());
