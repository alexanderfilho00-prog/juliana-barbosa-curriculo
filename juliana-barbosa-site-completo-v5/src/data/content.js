/**
 * Conteúdo central do site — edite aqui textos, links e assets.
 * Tudo o que aparece na página sai deste arquivo.
 */

export const site = {
  title: "Juliana Barbosa — marketing & community · brand strategy",
  description:
    "currículo digital de Juliana Barbosa: marketing & community, brand strategy, rio de janeiro.",
  lang: "pt-BR",
};

// link de portfólio guardado para o futuro (hoje não aparece na página)
export const links = {
  portfolio: "https://juliana-barbosa-portfolio.vercel.app",
};

/**
 * Contato — preencha apenas com dados reais.
 * Campos vazios (null) não aparecem na página.
 */
export const contact = {
  email: null, // ex.: "nome@dominio.com"
  linkedin: null, // ex.: "https://www.linkedin.com/in/usuario"
  instagram: null, // ex.: "https://instagram.com/usuario"
  phone: null, // ex.: "+55 21 90000-0000"
};

/**
 * Imagem do hero (ficha com retrato, fundo transparente). Para trocar, coloque o
 * arquivo em /public/images/ e atualize src, width, height e alt.
 * Com src null, o hero mostra um monograma provisório.
 */
export const photo = {
  src: "/images/juliana-card.webp",
  width: 905,
  height: 1201,
  alt: "ficha de portfólio de Juliana Barbosa: retrato preso com clipe, área de atuação marketing & branding, função brand strategist, foco em posicionamento, estratégia, identidade e comunicação criativa, 4+ anos de experiência.",
};

export const nav = [
  { label: "repertório", href: "#repertorio" },
  { label: "why me", href: "#por-que-eu" },
  { label: "trajetória", href: "#trajetoria" },
  { label: "let's talk", href: "#contato" },
];

export const hero = {
  firstName: "Juliana",
  lastName: "Barbosa",
  subtitle: ["marketing & community", "brand strategy", "rio de janeiro"],
  rotating: ["conteúdo", "brand strategy", "creative strategy"],
  taglineMain: "uma marca relevante não pede atenção. it just becomes the moment.",
  taglineRest:
    "calendário rodando, time entregando e uma marca que a comunidade reconhece de longe.",
  focusLabel: "my thing",
  focus: "culture, community & content",
  cta: { label: "why me ↓", href: "#por-que-eu" },
  label: "main character energy",
  badge: "culture ✦ community ✦ content ✦ ",
};

// faixa de letreiro entre o hero e o repertório
export const work = {
  marquee: ["fashion", "beach", "sports", "lifestyle", "wellness"],
};

export const repertoire = {
  title: [
    { text: "strategy first,", style: "sans" },
    { text: "culture always", style: "accent" },
  ],
  paragraphs: [
    "sou formada em publicidade pela ESPM-Rio e hoje coordeno conteúdo na Bardam Media. meu lugar é em marcas com personalidade forte, onde estratégia, estética e comunidade andam juntas.",
    "lá eu organizo o calendário, distribuo demandas e garanto que o time entregue no padrão de cada marca, de beleza e wellness ao varejo.",
    "antes disso passei por agência e in-house: social media, CRM na Reserva, campanhas, copy e muita leitura de métricas. por isso transito bem entre o criativo e o dado.",
    "hoje meu foco é <strong>brand strategy</strong>: entender o que uma marca é, em que universo ela vive e como transformar isso em comunidade. porque <mark>seguidor é número, mas fã é o que faz uma marca crescer.</mark>",
  ],
  tags: [
    "gestão de time criativo",
    "community building",
    "brand & content strategy",
    "trend research",
    "copy com personalidade",
    "data que vira decisão",
    "AI-powered workflow",
  ],
};

export const why = {
  title: "por que essa vaga é minha",
  items: [
    {
      title: "por dentro do universo da marca",
      text: "eu vivo moda, música e cultura como cliente antes de pensar como profissional. por isso entendo rápido o tom de voz, o posicionamento e a comunidade de cada marca.",
    },
    {
      title: "liderança assertiva",
      text: "amo liderar e estar perto das pessoas. sou acolhedora, crio confiança rápido e, por isso mesmo, consigo me impor quando preciso. meu jeitinho é fazer o time entregar bem e curtir o processo.",
    },
    {
      title: "calendário rodando",
      text: "é o que eu faço todo dia, com várias marcas. por isso, adquiri uma boa experiência de organização do planejamento para que tudo flua bem.",
    },
    {
      title: "briefing que ninguém precisa reler",
      text: "já trabalhei lado a lado com design, redação, vendas e branding. sei traduzir estratégia em briefing claro, que o time entende de primeira e executa sem ruído.",
    },
    {
      title: "olhar de marca",
      text: "moda e praia não são novidade pra mim (Reserva, beach clubs no Rio), e brand strategy é pra onde estou indo.",
    },
    {
      title: "AI-powered, human-led",
      text: "este site foi feito por mim com IA. no dia a dia, ela me ajuda com pauta, roteiro, análise e organização de fluxo. mas quem decide o que faz sentido pra marca sou eu: a IA acelera, o olhar é meu.",
    },
  ],
};

export const experience = {
  title: "por onde andei",
  items: [
    {
      role: "coordenadora de conteúdo",
      company: "Bardam Media",
      dates: "08/2026 até agora",
      current: true,
      text: "organizo o calendário, distribuo demandas e garanto que o time entregue no padrão de cada marca: beleza, wellness, saúde, varejo e comex.",
    },
    {
      role: "social media strategist",
      company: "Agência Inovar Mídia",
      dates: "03/2024 a 06/2025",
      text: "estratégia de conteúdo e branding, calendário editorial, direção criativa de vídeo e briefing pro design. tudo com olho nas métricas.",
    },
    {
      role: "freelancer em marketing digital",
      company: null,
      dates: "05/2024 a 01/2025",
      text: "campanhas, relatórios de KPI e benchmarking pra marcas que queriam crescer com dado na mão.",
    },
    {
      role: "estagiária de marketing",
      company: "Reserva, Grupo AR&CO",
      dates: "10/2022 a 07/2023",
      text: "CRM, segmentação e campanhas pra reativar cliente sumida. foi aí que aprendi que comunidade se constrói com dado e comunidade.",
    },
    {
      role: "estagiária de social media",
      company: "Agência Road",
      dates: "06/2022 a 09/2022",
      text: "redes, roteiros, storyboards e parcerias com influenciadores.",
    },
    {
      role: "estagiária de comunicação",
      company: "Zilah Joias & Sutilezas",
      dates: "2021",
      text: "redes, site, newsletter, press release e eventos de marca.",
    },
  ],
};

export const education = {
  title: "o que estudei",
  degree: {
    course: "publicidade e propaganda",
    school: "ESPM-Rio",
    dates: "2020 a 2024",
  },
  courses: [
    {
      name: "creative matrix, the business of world cup e creative/athletes mindset",
      school: "MatrixAcademy",
      dates: "2026",
    },
    { name: "mídia híbrido", school: "Master Globo", dates: "2025" },
    {
      name: "marketing e distribuição digital de música",
      school: "Co.liga",
      dates: "2025",
    },
    { name: "start! música e negócios", school: "Escola Música e Negócios", dates: "2024" },
    { name: "copywriting", school: "Rock University", dates: "2022" },
    {
      name: "decision making, team management e strategic thinking",
      school: "Harvard ManageMentor",
      dates: "2020 a 2022",
    },
    {
      name: "BCI leaders program: negócios, empreendedorismo e inovação",
      school: "Boston, EUA",
      dates: "2018",
    },
  ],
};

export const closing = {
  title: ["let's make it", "iconic!"],
  footer: "este site foi feito por mim com IA.",
};

/**
 * objetos 3D (gerados no Higgsfield, fundo transparente) — /public/images/3d
 * são decorativos: alt vazio.
 */
export const art = {
  estrela: "/images/3d/estrela-cromada.webp",
  brilho: "/images/3d/brilho-cromado.webp",
  blob: "/images/3d/blob-cromado.webp",
  celular: "/images/3d/flip-phone.webp",
  estrelaPreta: "/images/3d/estrela-preta.webp",
};
