/**
 * Conteúdo central do site — edite aqui textos, links e assets.
 * Tudo o que aparece na página sai deste arquivo.
 */

export const site = {
  title: "Juliana Barbosa — coordenadora de conteúdo · brand strategy",
  description:
    "currículo digital de Juliana Barbosa: coordenadora de conteúdo, brand strategy, rio de janeiro.",
  lang: "pt-BR",
};

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
 * Foto do hero. Coloque o arquivo em /public/images/ e informe o caminho,
 * ex.: { src: "/images/juliana.jpg", alt: "Juliana Barbosa sorrindo..." }
 * Com src null, o hero mostra a composição tipográfica provisória.
 * Formato recomendado: retrato vertical 4:5, mínimo 900×1125 px (jpg/webp).
 */
export const photo = {
  src: null,
  alt: "retrato de Juliana Barbosa",
  position: "50% 30%", // ajuste o enquadramento (object-position)
};

export const nav = [
  { label: "repertório", href: "#repertorio" },
  { label: "por que eu", href: "#por-que-eu" },
  { label: "trajetória", href: "#trajetoria" },
  { label: "contato", href: "#contato" },
];

export const hero = {
  firstName: "Juliana",
  lastName: "Barbosa",
  subtitle: ["coordenadora de conteúdo", "brand strategy", "rio de janeiro"],
  rotating: ["conteúdo", "brand strategy", "creative strategy"],
  taglineMain: "planejo, organizo e faço acontecer.",
  taglineRest:
    "calendário rodando, time entregando e uma marca que a comunidade reconhece de longe.",
  focusLabel: "direcionamento:",
  focus: "brand strategy & creative strategy",
  cta: { label: "ver os trabalhos ↓", href: "#trabalhos" },
  label: "planejo e faço",
  badge: "brand strategy ✦ conteúdo ✦ comunidade ✦ ",
};

export const work = {
  title: "trabalhos",
  text: "projetos entre moda, praia, esporte, lifestyle e wellness.",
  marquee: ["moda", "praia", "esporte", "lifestyle", "wellness"],
  link: { label: "abrir portfólio ↗", href: links.portfolio },
};

export const repertoire = {
  title: [
    { text: "rotina de quem executa,", style: "sans" },
    { text: "cabeça de quem lidera", style: "serif" },
    { text: "e que coloca o cérebro para trabalhar.", style: "small" },
  ],
  paragraphs: [
    "sou formada em publicidade pela ESPM-Rio e hoje sou coordenadora de conteúdo na Bardam Media, com muita vontade de agregar e fazer acontecer com marcas que realmente estou no universo e amo.",
    "lá eu organizo o calendário, distribuo demandas e garanto que o time entregue no padrão de cada marca, de beleza e wellness a varejo.",
    "antes disso passei por agência e in-house: social media, CRM na Reserva, campanhas, copy e muita leitura de métricas. ou seja, <mark>planejo e faço.</mark>",
    "hoje em dia meu foco principal é <strong>brand strategy</strong>: entender o que uma marca é, em que universo ela vive e como transformar em uma comunidade forte.",
    "a Makai já domina como poucas no mercado, e minha vontade é de fazer história e ajudar a escalar ainda mais uma marca que já tem tanto potencial.",
  ],
  tags: [
    "gestão de projetos",
    "calendário editorial",
    "liderança de time criativo",
    "brand strategy",
    "copy & conteúdo",
    "análise de performance",
    "IA no processo",
  ],
};

export const why = {
  title: "por que essa vaga é minha",
  items: [
    {
      title: "por dentro do universo da marca",
      text: "sou consumidora da makai desde o início, então conheço a marca do lado de quem compra, usa e entende o tom de voz, posicionamento e comunidade da marca.",
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
      title: "time alinhado",
      text: "já trabalhei lado a lado com design, redação, vendas, e branding. sei transformar estratégia em briefing que funciona.",
    },
    {
      title: "olhar de marca",
      text: "moda e praia não são novidade pra mim (Reserva, beach clubs no Rio), e brand strategy é pra onde estou indo.",
    },
    {
      title: "IA na prática",
      text: "este site foi feito por mim com IA, e eu uso no dia a dia pra pauta, roteiro, análise e organização de fluxo. mas isso qualquer um aprende hoje em dia, meu diferencial é que continuo treinando meu cérebro e usando ele como protagonista, e a IA como uma facilitadora de processos.",
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
    { name: "start! música e negócios", school: null, dates: "2024" },
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
  title: ["vamos", "conversar?"],
  footer: "este site foi feito por mim com IA.",
};
