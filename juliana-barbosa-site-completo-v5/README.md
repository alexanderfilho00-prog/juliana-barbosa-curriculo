# juliana barbosa — currículo digital

site de uma página em [Astro](https://astro.build) (HTML estático) com animações em [GSAP](https://gsap.com) (core, timeline, ScrollTrigger e CustomEase).

fontes: Great Vibes (script, ≈ Renaissance) e DM Sans (≈ Circular) via Fontsource (licença OFL); TeX Gyre Bonum itálica (clone livre do Bookman Old Style, GUST Font License) em `public/fonts/`.
objetos 3D cromados: gerados no Higgsfield com fundo transparente, em `public/images/3d/`.

## rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera /dist
npm run preview  # serve o /dist
```

publicação na Vercel: importar o repositório. o preset "Astro" é detectado sozinho (build `npm run build`, saída `dist`).

## onde editar

| o quê | arquivo |
|---|---|
| todos os textos, links, contato e foto | `src/data/content.js` |
| cores, tipografia, layout | `src/styles/global.css` (tokens no `:root`) |
| animações (GSAP) | `src/scripts/motion.js` |
| objetos 3D | `public/images/3d/` (mapa em `art`, no `content.js`) |
| selo e seta vetoriais | `src/components/stickers/` |
| seções | `src/components/*.astro` |

### foto
1. coloque o retrato em `public/images/` (vertical 4:5, mínimo 900×1125 px, jpg ou webp).
2. em `src/data/content.js`, preencha `photo.src` (ex.: `"/images/juliana.jpg"`) e o `alt`.
3. ajuste o enquadramento em `photo.position` se precisar (ex.: `"50% 25%"`).

sem foto, a moldura mostra um monograma "jb" provisório.

### contato
preencha `contact.email`, `contact.linkedin`, `contact.instagram` ou `contact.phone` em `content.js`.
só os campos preenchidos aparecem na página.

## acessibilidade e movimento
- com `prefers-reduced-motion`, a entrada vira fades curtos, sem deslocamento, e selo, letreiros e stickers ficam parados.
- sem JavaScript, o conteúdo também aparece completo.
- animações contínuas (selo, letreiros, objetos) só rodam enquanto estão visíveis na tela.
- respostas ao hover só existem com mouse (`hover: hover` e `pointer: fine`).
- skills usadas no projeto ficam em `.claude/skills/` (frontend-design, gsap-*, animate, webapp-testing).
