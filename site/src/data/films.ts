// Verified from Golpo Greehoo Films' own YouTube channel (research/DOSSIER.md).
// Every client/agency credit here is copied from the studio's own video descriptions.
// No invented clients, no fabricated credits — see the dossier for sourcing.

export type Film = {
  slug: string
  title: string
  titleBangla?: string
  client: string
  agency?: string
  director: string
  year: string
  duration: string
  youtubeId: string
  image: string
  size: 'lg' | 'md' | 'sm' // contact-sheet cell sizing
  deliverables?: string[]
  note?: string
}

export const films: Film[] = [
  {
    slug: 'fresh-premium-tea',
    title: 'Fresh Premium Tea — Shei Tumi Ke',
    client: 'MGI',
    agency: 'Sun Communication',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '4:51',
    youtubeId: '18I_cZohaH0',
    image: '/img/work/fresh-premium-tea.jpg',
    size: 'lg',
    note: 'A man alone on a tidal flat, an abandoned piano, a planet in the sky — magical-realist short-film craft carried by a tea commercial.',
  },
  {
    slug: 'hero-desh-bangladesh',
    title: "Hero'r Desh Bangladesh",
    client: 'Hero',
    agency: 'Carrot Com',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '2:26',
    youtubeId: 'shHwzaFKJZs',
    image: '/img/work/hero-desh-bangladesh.jpg',
    size: 'lg',
  },
  {
    slug: 'apex-eid-anthem',
    title: 'Apex Eid Anthem',
    client: 'Apex',
    agency: 'Grey',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '2:23',
    youtubeId: 't7z4pFiOQL0',
    image: '/img/work/apex-eid-anthem.jpg',
    size: 'md',
  },
  {
    slug: 'bsrm-thematic-70-years',
    title: 'BSRM Thematic — 70 Years',
    client: 'BSRM',
    agency: 'Bitopi',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '1:23',
    youtubeId: 'es7_8P2UVaU',
    image: '/img/work/bsrm-thematic.jpg',
    size: 'md',
  },
  {
    slug: 'airtel-regional-anthem-series',
    title: 'Airtel Bangladesh — Regional Anthem Series',
    client: 'Airtel Bangladesh',
    agency: 'Bitopi',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '4 versions',
    youtubeId: '8EJTyW7Ftlw',
    image: '/img/work/airtel-regional-series.jpg',
    size: 'lg',
    deliverables: ['Chittagong', 'Rajshahi', 'Sylhet', 'YOLO Start'],
    note: 'One campaign, four regional cuts — the deliverable shape the Studio OS is built around.',
  },
  {
    slug: 'belleame-biscuit',
    title: 'BelleAme Chocolate Biscuit',
    client: 'New Zealand Dairy',
    agency: 'Cocktail Limited',
    director: 'Shahrear Polock',
    year: '2026',
    duration: '0:47',
    youtubeId: 'vPoRl5SHun0',
    image: '/img/work/belleame-biscuit.jpg',
    size: 'sm',
  },
  {
    slug: 'amar-bkash-shahosh',
    title: 'Amar bKash — সাহস',
    titleBangla: 'সাহস',
    client: 'Amar bKash',
    agency: 'Bread & Butter',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '1:45',
    youtubeId: 'IMw4R9Zs1uU',
    image: '/img/work/bkash-shahosh.jpg',
    size: 'sm',
  },
  {
    slug: 'amar-bkash-ullikhito',
    title: 'Amar bKash — উল্লিখিত',
    titleBangla: 'উল্লিখিত',
    client: 'Amar bKash',
    agency: 'Bread & Butter',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '1:41',
    youtubeId: 'ne_dtk1NQuo',
    image: '/img/work/bkash-ullikhito.jpg',
    size: 'sm',
  },
  {
    slug: 'asmar-golpo',
    title: 'Asmar Golpo — বিকশিত বাংলাদেশ',
    titleBangla: 'বিকশিত বাংলাদেশ',
    client: 'Bikoshito Bangladesh',
    agency: 'Bread & Butter',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '2:08',
    youtubeId: 'xaq-M_pT1r0',
    image: '/img/work/asmar-golpo.jpg',
    size: 'md',
  },
  {
    slug: 'swapno-apon-shokti',
    title: 'Swapno — Apon Shokti Te Nari',
    client: 'ACI',
    agency: 'Salt Creatives',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '2:23',
    youtubeId: 'bQ_f6JT23f4',
    image: '/img/work/swapno-aci.jpg',
    size: 'md',
  },
  {
    slug: 'wcit-thematic',
    title: 'WCIT Thematic',
    client: 'ICT Division',
    agency: 'Grey',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '3:03',
    youtubeId: 'wRV4U7cxPv8',
    image: '/img/work/wcit-thematic.jpg',
    size: 'sm',
  },
  {
    slug: 'fresh-khushi-chorai',
    title: 'Fresh Khushi Chorai',
    client: 'MGI',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '3:08',
    youtubeId: 'x6r4o2XB5yM',
    image: '/img/work/fresh-khushi-chorai.jpg',
    size: 'md',
  },
  {
    slug: 'cholona-ek-sathe',
    title: 'Cholona Ek Sathe',
    client: 'Meher',
    director: 'Shahrear Polock',
    year: '2025',
    duration: '4:09',
    youtubeId: 'EWYhMmYn4Zw',
    image: '/img/work/cholona-ek-sathe.jpg',
    size: 'sm',
  },
  {
    slug: 'bata-eid-2026',
    title: 'BATA — Eid Thematic 2026',
    client: 'BATA',
    agency: 'Cocktail Limited',
    director: 'Shahrear Polock',
    year: '2026',
    duration: '2:01',
    youtubeId: 'FjeV3sdxHAs',
    image: '/img/work/bata-eid-2026.jpg',
    size: 'sm',
    note: 'Just released.',
  },
]

// Cast/crew below are transcribed directly from the film's own official
// theatrical poster (Golpo Greehoo Films in association with Aloksajja) —
// real names, not invented.
export const featuredFilm = {
  slug: 'bokuler-buke-rokto-korobi',
  title: 'Bokuler Buke Rokto Korobi',
  titleBangla: 'বকুলের বুকে রক্তকরবী',
  tagline: 'Some stories never die.',
  director: 'Shahrear Polock',
  directorBangla: 'শাহরিয়ার পলক',
  production: 'Golpo Greehoo Films · Aloksajja',
  locations: 'Sundarbans & Barisal',
  genre: 'Psychological horror',
  externalUrl: 'https://bbrkmovie.com',
  heroImage: '/img/bbrk/hero-key-art.jpeg',
  poster: '/img/bbrk/poster.jpg',
  posterAmbient: '/img/bbrk/poster-ambient.jpg',
  posterGallery: [
    { src: '/img/bbrk/poster-eye.jpg', alt: 'Bokuler Buke Rokto Korobi poster — close-up portrait' },
    { src: '/img/bbrk/poster-couple.jpg', alt: 'Bokuler Buke Rokto Korobi poster — two figures in a blue-lit room' },
    { src: '/img/bbrk/poster-woman.jpg', alt: 'Bokuler Buke Rokto Korobi poster — woman holding a flower' },
  ],
  cast: ['Priyontee Urbee', 'Mir Rabby', 'Kuntal Bishwas Buki', 'Shahadot Sisir'],
  credits: [
    { role: 'Producer', name: 'Saiful Islam' },
    { role: 'DOP', name: 'Khaier Khandakar' },
    { role: 'Story, Screenplay & Edit', name: 'Shahrear Polock' },
    { role: 'Deputy Director', name: 'Sohan Polock' },
    { role: 'Chief AD', name: 'Rakib Haq' },
    { role: 'Music', name: 'Studio 8A · Subhro Raha · Aynus Tazwar Haque' },
    { role: 'Color Grading', name: 'Jakir Hossain' },
    { role: 'Costume', name: 'Zannat Mouri' },
  ],
  characters: [
    { name: 'Bokul', nameBangla: 'বকুল', line: 'She remembers what the village chose to forget.' },
    {
      name: 'Rokto Korobi',
      nameBangla: 'রক্তকরবী',
      line: 'A flower that only blooms where blood was spilled.',
    },
    { name: 'The Keeper', nameBangla: 'রক্ষক', line: 'He guards a door that has been open all along.' },
    { name: 'The Witness', nameBangla: 'সাক্ষী', line: 'The last one to see. The first one to be seen.' },
  ],
}

export function getFilmBySlug(slug: string) {
  return films.find((f) => f.slug === slug)
}
