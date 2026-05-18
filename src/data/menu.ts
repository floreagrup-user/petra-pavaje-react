export interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
  badge?: string
}

export const mainMenu: MenuItem[] = [
  {
    label: 'Produse',
    href: '/produse',
    children: [
      {
        label: 'Pavaje Premium',
        href: '/produse/pavaje-premium',
        children: [
          { label: 'Roca', href: '/produse/pavaje-premium/roca' },
          { label: 'Antic', href: '/produse/pavaje-premium/antic' },
          { label: 'Primo', href: '/produse/pavaje-premium/primo' },
          { label: 'Grand Urban', href: '/produse/pavaje-premium/grand-urban' },
          { label: 'Gemina', href: '/produse/pavaje-premium/gemina' },
          { label: 'Cubic', href: '/produse/pavaje-premium/cubic' },
          { label: 'Mistic', href: '/produse/pavaje-premium/mistic' },
          { label: 'Mediterana', href: '/produse/pavaje-premium/mediterana' },
          { label: 'Viena', href: '/produse/pavaje-premium/viena' },
          { label: 'Maya', href: '/produse/pavaje-premium/maya' },
          { label: 'Roman', href: '/produse/pavaje-premium/roman' },
          { label: 'Sahara', href: '/produse/pavaje-premium/sahara' },
          { label: 'Alpin', href: '/produse/pavaje-premium/alpin' },
          { label: 'Pastel', href: '/produse/pavaje-premium/pastel' },
          { label: 'Timber', href: '/produse/pavaje-premium/timber' },
          { label: 'Terranova', href: '/produse/pavaje-premium/terranova' },
          { label: 'Dacic', href: '/produse/pavaje-premium/dacic' },
          { label: 'Relief', href: '/produse/pavaje-premium/relief' },
          { label: 'Urbis', href: '/produse/pavaje-premium/stretto' },
        ],
      },
      {
        label: 'Pavaje Standard',
        href: '/produse/pavaje-standard',
        children: [
          { label: 'Holland', href: '/produse/pavaje-standard/holland' },
          { label: 'Autobloc', href: '/produse/pavaje-standard/autobloc' },
          { label: 'Unda', href: '/produse/pavaje-standard/unda' },
          { label: 'Quatro', href: '/produse/pavaje-standard/quatro' },
          { label: 'Con', href: '/produse/pavaje-standard/con' },
          { label: 'Pavaje Eco', href: '/produse/pavaje-standard/pavaje-eco' },
        ],
      },
      {
        label: 'Woodstone',
        href: '/produse/woodstone',
        children: [
          { label: 'Pavaj', href: '/produse/woodstone/pavaj' },
          { label: 'Palisade și Borduri', href: '/produse/woodstone/palisade-si-borduri' },
          { label: 'Garduri', href: '/produse/woodstone/garduri' },
          { label: 'Bănci și Mese', href: '/produse/woodstone/banci-si-mese' },
          { label: 'Jardiniere Înălțate', href: '/produse/woodstone/jardiniere-inaltate' },
          { label: 'Scări', href: '/produse/woodstone/scari' },
          { label: 'Elemente Lemn Pietrificat', href: '/produse/woodstone/elemente-lemn-pietrificat' },
        ],
      },
      {
        label: 'Elemente',
        href: '/produse/elemente',
        children: [
          { label: 'Borduri', href: '/produse/elemente/borduri' },
          { label: 'Rigole', href: '/produse/elemente/rigole' },
          { label: 'Bolțari', href: '/produse/elemente/boltari' },
          { label: 'Garduri', href: '/produse/elemente/garduri' },
          { label: 'Jardiniere', href: '/produse/elemente/jardiniere' },
          { label: 'Palisadă', href: '/produse/elemente/palisada' },
          { label: 'Bănci', href: '/produse/elemente/banci' },
          { label: 'Treaptă', href: '/produse/elemente/treapta' },
          { label: 'Bloc de zid', href: '/produse/elemente/bloc-de-zid' },
          { label: 'Elemente de canalizare', href: '/produse/elemente/elemente-canalizare' },
        ],
      },
    ],
  },
  {
    label: 'Compania',
    href: '/compania',
    children: [
      { label: 'Despre Noi', href: '/despre-noi' },
      { label: 'Florea Grup – 30 de ani', href: '/florea-grup' },
      { label: 'Sustenabilitate', href: '/sustenabilitate' },
      { label: 'Garanție', href: '/garantie' },
      { label: 'Laborator', href: '/laborator' },
      { label: 'Carieră', href: '/cariera' },
    ],
  },
  {
    label: 'Resurse',
    href: '/resurse',
    children: [
      { label: 'Catalog', href: '/catalog' },
      { label: 'Modele de montaj', href: '/modele-montaj' },
      { label: 'Ghid întreținere', href: '/intretinere' },
      { label: 'Întrebări frecvente', href: '/faq' },
      { label: 'Documente tehnice', href: '/documente' },
      { label: 'Broșuri', href: '/brosuri' },
    ],
  },
  {
    label: 'Tur Virtual',
    href: '/tur-virtual',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
    badge: 'Ofertă',
  },
]

export const footerLinks = {
  products: [
    { label: 'Pavaje Premium', href: '/produse/pavaje-premium' },
    { label: 'Pavaje Standard', href: '/produse/pavaje-standard' },
    { label: 'Woodstone', href: '/produse/woodstone' },
    { label: 'Garduri', href: '/produse/elemente/garduri' },
    { label: 'Borduri', href: '/produse/elemente/borduri' },
    { label: 'Bolțari', href: '/produse/elemente/boltari' },
  ],
  company: [
    { label: 'Despre Noi', href: '/despre-noi' },
    { label: 'Sustenabilitate', href: '/sustenabilitate' },
    { label: 'Carieră', href: '/cariera' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Modele de montaj', href: '/modele-montaj' },
    { label: 'Ghid întreținere', href: '/intretinere' },
    { label: 'Tur Virtual', href: '/tur-virtual' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Politica de confidențialitate', href: '/confidentialitate' },
    { label: 'Politica cookie-uri', href: '/cookie-uri' },
    { label: 'Termeni și condiții', href: '/termeni' },
  ],
}

export const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/PetraPavaje', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/petrapavaje/', icon: 'instagram' },
  { name: 'YouTube', href: 'https://www.youtube.com/@petrapavaje', icon: 'youtube' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/florea-grup/', icon: 'linkedin' },
  { name: 'Pinterest', href: 'https://www.pinterest.com/petrapavaje/', icon: 'pinterest' },
]
