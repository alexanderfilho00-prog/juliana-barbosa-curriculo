/**
 * Movimento do site — Motion (motion.dev) sobre a Web Animations API.
 * Só anima transform/opacity (sem deslocar layout). Rolagem continua nativa.
 * Com prefers-reduced-motion, nada aqui roda e o conteúdo aparece estático.
 */
import { animate } from "motion/mini";
import { inView, stagger } from "motion";

window.__jbMotion = true;

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = [0.22, 1, 0.36, 1];
const POP = [0.34, 1.56, 0.64, 1];
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** anima e, ao terminar, grava o estado final inline (sem depender de fill) */
function play(targets, keyframes, options) {
  const els = Array.isArray(targets) ? targets : [targets];
  if (!els.length) return;
  const controls = animate(els, keyframes, options);
  const final = {};
  for (const [k, v] of Object.entries(keyframes)) final[k] = Array.isArray(v) ? v[v.length - 1] : v;
  Promise.resolve(controls.finished ?? controls).then(() => {
    els.forEach((el) => {
      if ("opacity" in final) el.style.opacity = final.opacity;
      if ("transform" in final) el.style.transform = final.transform;
      if ("strokeDashoffset" in final) el.style.strokeDashoffset = final.strokeDashoffset;
    });
  });
}

/** dispara uma vez quando o elemento entra na tela */
function once(selector, fn, margin = "0px 0px -12% 0px") {
  $$(selector).forEach((el) => {
    const stop = inView(el, () => { fn(el); stop(); }, { margin });
  });
}

/* ---------- loops contínuos só enquanto visíveis ---------- */
function loops() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle("is-playing", e.isIntersecting)),
    { rootMargin: "40px" }
  );
  $$("[data-loop]").forEach((el) => io.observe(el));
}

/* ---------- alternância de palavras (digitação) ---------- */
function rotator() {
  const box = $(".rotator");
  if (!box) return;
  const words = JSON.parse(box.dataset.words);
  const text = $(".rotator__text", box);
  const MAX_CYCLES = 4; // depois de 4 voltas, para em "brand strategy"
  let wi = 0, ci = words[0].length, deleting = false, cycles = 0;
  let visible = true, timer = null, done = false;

  const schedule = (ms) => { timer = setTimeout(() => { timer = null; tick(); }, ms); };
  const resume = () => { if (!done && !timer && visible && !document.hidden) schedule(400); };

  function tick() {
    if (done || !visible || document.hidden) return;
    const w = words[wi];
    if (!deleting) {
      if (ci < w.length) { ci++; text.textContent = w.slice(0, ci); return schedule(70); }
      if (cycles >= MAX_CYCLES && wi === 1) { done = true; box.classList.add("is-done"); return; }
      deleting = true;
      return schedule(1900);
    }
    if (ci > 0) { ci--; text.textContent = w.slice(0, ci); return schedule(38); }
    deleting = false;
    wi = (wi + 1) % words.length;
    if (wi === 0) cycles++;
    schedule(320);
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; resume(); }).observe(box);
  document.addEventListener("visibilitychange", resume);
  schedule(2400); // começa depois da entrada do hero
}

/* ---------- entrada do hero: nome → apresentação → foto → detalhes ---------- */
function hero() {
  play($$('[data-hero="name"] .word'),
    { opacity: [0, 1], transform: ["translateY(0.3em) rotate(-3deg)", "none"] },
    { duration: 0.85, delay: stagger(0.12), ease: EASE });

  play($$('[data-hero="intro"] > *'),
    { opacity: [0, 1], transform: ["translateY(16px)", "none"] },
    { duration: 0.6, delay: stagger(0.07, { startDelay: 0.3 }), ease: EASE });

  play($('[data-hero="photo"]'),
    { opacity: [0, 1], transform: ["scale(0.86) rotate(-5deg)", "none"] },
    { duration: 0.95, delay: 0.45, ease: POP });

  play($$('[data-hero="detail"]'),
    { opacity: [0, 1], transform: ["scale(0.2) rotate(-25deg)", "none"] },
    { duration: 0.6, delay: stagger(0.1, { startDelay: 0.95 }), ease: POP });

  const line = $(".hand-arrow__line");
  const head = $(".hand-arrow__head");
  if (line) play(line, { strokeDashoffset: [1, 0] }, { duration: 1.1, delay: 1.15, ease: "easeInOut" });
  if (head) play(head, { opacity: [0, 1] }, { duration: 0.25, delay: 2.15 });
}

/* ---------- revelações na rolagem (cada tipo com seu gesto) ---------- */
function reveals() {
  // títulos: palavras sobem em sequência
  once("[data-split]", (el) =>
    play($$(".w", el),
      { opacity: [0, 1], transform: ["translateY(0.4em) rotate(2deg)", "none"] },
      { duration: 0.7, delay: stagger(0.055), ease: EASE }));

  // blocos de texto: subida curta
  once('[data-reveal="up"]', (el) =>
    play(el, { opacity: [0, 1], transform: ["translateY(22px)", "none"] }, { duration: 0.7, ease: EASE }));

  // stickers: colados com um "pop"
  once('[data-reveal="sticker"]', (el) =>
    play(el, { opacity: [0, 1], transform: ["scale(0.3) rotate(-30deg)", "none"] }, { duration: 0.65, ease: POP }), "0px");

  // etiquetas: aparecem uma a uma
  once('[data-reveal="tags"]', (el) =>
    play([...el.children],
      { opacity: [0, 1], transform: ["scale(0.6) translateY(10px)", "none"] },
      { duration: 0.5, delay: stagger(0.06), ease: POP }));

  // argumentos: régua desenha, conteúdo entra de lado
  once('[data-reveal="why"]', (el) => {
    const i = [...el.parentElement.children].indexOf(el);
    const dir = i % 2 === 0 ? -28 : 28;
    play($(".why__rule", el), { transform: ["scaleX(0)", "none"] }, { duration: 0.8, ease: EASE });
    play([...el.children].filter((c) => !c.classList.contains("why__rule")),
      { opacity: [0, 1], transform: [`translateX(${dir}px)`, "none"] },
      { duration: 0.7, delay: stagger(0.08, { startDelay: 0.15 }), ease: EASE });
  });

  // trajetória: cada linha desliza da esquerda
  once('[data-reveal="xp"]', (el) =>
    play(el, { opacity: [0, 1], transform: ["translateX(-36px)", "none"] }, { duration: 0.75, ease: EASE }));

  // cursos: lista compacta, rápida
  once('[data-reveal="courses"]', (el) =>
    play([...el.children],
      { opacity: [0, 1], transform: ["translateY(10px)", "none"] },
      { duration: 0.45, delay: stagger(0.05), ease: EASE }));

  // graduação: cartão "colado"
  once('[data-reveal="degree"]', (el) =>
    play(el, { opacity: [0, 1], transform: ["scale(0.9) rotate(5deg)", "none"] }, { duration: 0.8, ease: POP }));

  // contato: palavras grandes crescem
  once('[data-reveal="big"]', (el) =>
    play($$(".contact__w", el),
      { opacity: [0, 1], transform: ["scale(0.75) translateY(20px)", "none"] },
      { duration: 0.8, delay: stagger(0.15), ease: POP }));
}

if (!reduce && root.classList.contains("motion-ok")) {
  loops();
  rotator();
  hero();
  reveals();
}
