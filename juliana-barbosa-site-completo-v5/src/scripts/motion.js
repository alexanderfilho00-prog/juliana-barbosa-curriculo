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

/* ---------- entrada do hero: pílulas → nome escrito → apresentação ---------- */
// o nome em script aparece "escrito" da esquerda para a direita (clip-path);
// margens negativas no recorte para não cortar laços e descendentes.
const WRITE_FROM = "inset(-45% 100% -45% -12%)";
const WRITE_TO = "inset(-45% -12% -45% -12%)";

function heroTimeline() {
  const tl = gsap.timeline({ defaults: { ease: "out", duration: 0.8 } });

  tl.addLabel("pills", 0.05)
    .set('[data-hero="pills"]', { autoAlpha: 1 }, "pills")
    .fromTo('[data-hero="pills"] > *', { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 }, "pills")

    .addLabel("name", "pills+=0.2")
    .fromTo('[data-hero="first"]',
      { autoAlpha: 1, clipPath: WRITE_FROM },
      { clipPath: WRITE_TO, duration: 1.2, ease: "power2.inOut", clearProps: "clipPath" },
      "name")
    .fromTo('[data-hero="last"]',
      { autoAlpha: 0, x: 32 },
      { autoAlpha: 1, x: 0, duration: 0.8 },
      "name+=0.85")

    .addLabel("intro", "name+=1.0")
    .fromTo('.rotator-line', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "intro")
    .fromTo('[data-hero="rule"]', { autoAlpha: 0, scaleX: 0.2 }, { autoAlpha: 1, scaleX: 1, duration: 0.7, ease: "inOut" }, "intro+=0.08")
    .set('.hero__intro', { autoAlpha: 1 }, "intro+=0.12")
    .fromTo('.hero__intro > *', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, "intro+=0.12");

  return tl;
}

/* ---------- ficha: foto de fichamento ----------
   1. a ficha cai sobre a mesa (gira e assenta)
   2. o flash da câmera estoura no formato da ficha
   3. a foto "revela": do branco estourado e sem cor até o tom real
   4. a etiqueta bate como carimbo; selo e estrela colam em seguida
   No desktop roda junto com o hero; no celular, quando a ficha entra na tela. */
function cardTimeline() {
  const card = q('[data-hero="photo"]');
  if (!card) return;
  const img = q(".card__img", card);
  const flash = q(".card__flash", card);
  const tl = gsap.timeline({
    defaults: { ease: "out" },
    delay: 0.35,
    scrollTrigger: { trigger: card, start: "top 85%", once: true },
  });

  tl.addLabel("drop", 0)
    .fromTo(card,
      { autoAlpha: 0, y: -70, rotation: -10, scale: 1.04 },
      { autoAlpha: 1, y: 0, rotation: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)" },
      "drop");

  tl.addLabel("flash", "drop+=0.55");
  if (flash) tl
    .fromTo(flash, { opacity: 0 }, { opacity: 0.95, duration: 0.06, ease: "none" }, "flash")
    .to(flash, { opacity: 0, duration: 0.55 }, "flash+=0.08");
  if (img) tl.fromTo(img,
    { filter: "brightness(2.4) contrast(0.6) saturate(0) blur(2px)" },
    { filter: "brightness(1) contrast(1) saturate(1) blur(0px)", duration: 1.3, clearProps: "filter" },
    "flash+=0.02");

  tl.addLabel("details", "flash+=0.35")
    .fromTo(".hero__label",
      { autoAlpha: 0, scale: 1.45, rotation: 10 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.32, ease: "power3.in" },
      "details")
    .fromTo('.hero__badge',
      { autoAlpha: 0, scale: 0.9, rotation: -10 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.6)" },
      "details+=0.2")
    .fromTo('.hand-arrow__line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "inOut" }, "details+=0.1")
    .fromTo('.hand-arrow__head', { opacity: 0 }, { opacity: 1, duration: 0.2 }, ">-0.05");
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
  // título: linha em script é "escrita"; o complemento em serif sobe em seguida
  qa("h2").forEach((heading) => {
    const write = qa("[data-write]", heading);
    const follow = qa("[data-follow]", heading);
    if (!write.length && !follow.length) return;
    const tl = gsap.timeline({
      defaults: { ease: "out" },
      scrollTrigger: { trigger: heading, start: "top 85%", once: true },
    });
    if (write.length) tl.fromTo(write, { autoAlpha: 1, clipPath: WRITE_FROM }, { clipPath: WRITE_TO, duration: 1.1, ease: "power2.inOut", clearProps: "clipPath" });
    if (follow.length) tl.fromTo(follow, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, write.length ? "-=0.35" : 0);
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
    .to('[data-hero="pills"], [data-hero="first"], [data-hero="last"]', { autoAlpha: 1 })
    .to('.rotator-line, [data-hero="rule"], .hero__intro, .hero__intro > *', { autoAlpha: 1 }, "<0.1")
    .to('[data-hero="photo"], [data-hero="detail"]', { autoAlpha: 1 }, "<0.1")
    .set(".hand-arrow__line", { strokeDashoffset: 0 })
    .set(".hand-arrow__head", { opacity: 1 });
  q(".rotator")?.classList.add("is-done");
  ScrollTrigger.batch("[data-write], [data-follow], [data-sticker]", {
    start: "top 92%", once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, duration: 0.25, ease: "none" }),
  });
}

const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
  if (ctx.conditions.reduce) { reduced(); return; }
  const tl = heroTimeline();
  cardTimeline();
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
