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
        href: '/pavaje-premium',
        children: [
          { label: 'Roca', href: '/pavaje-premium/roca' },
          { label: 'Antic', href: '/pavaje-premium/antic' },
          { label: 'Primo', href: '/pavaje-premium/primo' },
          { label: 'Grand Urban', href: '/pavaje-premium/grand-urban' },
          { label: 'Gemina', href: '/pavaje-premium/gemina' },
          { label: 'Cubic', href: '/pavaje-premium/cubic' },
          { label: 'Mistic', href: '/pavaje-premium/mistic' },
          { label: 'Mediterana', href: '/pavaje-premium/mediterana' },
          { label: 'Viena', href: '/pavaje-premium/viena' },
          { label: 'Maya', href: '/pavaje-premium/maya' },
          { label: 'Roman', href: '/pavaje-premium/roman' },
          { label: 'Sahara', href: '/pavaje-premium/sahara' },
          { label: 'Alpin', href: '/pavaje-premium/alpin' },
          { label: 'Pastel', href: '/pavaje-premium/pastel' },
          { label: 'Timber', href: '/pavaje-premium/timber' },
          { label: 'Terranova', href: '/pavaje-premium/terranova' },
          { label: 'Dacic', href: '/pavaje-premium/dacic' },
          { label: 'Relief', href: '/pavaje-premium/relief' },
          { label: 'Urbis', href: '/pavaje-premium/stretto' },
        ],
      },
      {
        label: 'Pavaje Standard',
        href: '/pavaje-standard',
        children: [
          { label: 'Holland', href: '/pavaje-standard/holland' },
          { label: 'Autobloc', href: '/pavaje-standard/autobloc' },
          { label: 'Unda', href: '/pavaje-standard/unda' },
          { label: 'Quatro', href: '/pavaje-standard/quatro' },
          { label: 'Con', href: '/pavaje-standard/con' },
          { label: 'Pavaje Eco', href: '/pavaje-standard/pavaje-eco' },
        ],
      },
      {
        label: 'Woodstone',
        href: '/woodstone-lemn-pietrificat',
        children: [
          { label: 'Pavaj', href: '/woodstone-lemn-pietrificat/pavaj' },
          { label: 'Palisade și Borduri', href: '/woodstone-lemn-pietrificat/palisade-si-borduri' },
          { label: 'Garduri', href: '/woodstone-lemn-pietrificat/garduri' },
          { label: 'Bănci și Mese', href: '/woodstone-lemn-pietrificat/banci-si-mese' },
          { label: 'Jardiniere Înălțate', href: '/woodstone-lemn-pietrificat/jardiniere-inaltate' },
          { label: 'Scări', href: '/woodstone-lemn-pietrificat/scari' },
          { label: 'Elemente Lemn Pietrificat', href: '/woodstone-lemn-pietrificat/elemente-lemn-pietrificat' },
        ],
      },
      {
        label: 'Elemente',
        href: '/elemente',
        children: [
          { label: 'Borduri', href: '/borduri' },
          { label: 'Rigole', href: '/rigole' },
          { label: 'Bolțari', href: '/boltari' },
          {
            label: 'Garduri',
            href: '/garduri',
            children: [
              { label: 'Robusto', href: '/garduri/robusto' },
              { label: 'Modern', href: '/garduri/modern' },
              { label: 'Baroc', href: '/garduri/baroc' },
            ],
          },
          { label: 'Jardiniere', href: '/jardiniere' },
          { label: 'Palisadă', href: '/palisada' },
          { label: 'Treaptă', href: '/treapta' },
          { label: 'Bloc de zid', href: '/bloc-de-zid' },
          {
            label: 'Elemente de canalizare',
            href: '/elemente-de-canalizare',
            children: [
              { label: 'Bloc de beton', href: '/elemente-de-canalizare/bloc-de-beton' },
              { label: 'Cămine 1000 mm', href: '/elemente-de-canalizare/elemente-pentru-camine-1000-mm' },
              { label: 'Cămine 800 mm', href: '/elemente-de-canalizare/elemente-pentru-camine-800-mm' },
              { label: 'Tub fântână', href: '/elemente-de-canalizare/tub-fantana' },
              { label: 'Tuburi și timpane', href: '/elemente-de-canalizare/tuburi-si-timpane' },
              { label: 'Infrastructură rutieră', href: '/elemente-de-canalizare/infrastructura-rutiera' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Compania',
    href: '/despre-noi',
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
    href: '/catalog',
    children: [
      { label: 'Catalog', href: '/catalog' },
      { label: 'Montaj', href: '/montaj' },
      { label: 'Modele de Montaj', href: '/modele-de-montaj' },
      { label: 'Ghid întreținere', href: '/intretinere' },
      { label: 'Degivrare', href: '/degivrare' },
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
    { label: 'Pavaje Premium', href: '/pavaje-premium' },
    { label: 'Pavaje Standard', href: '/pavaje-standard' },
    { label: 'Woodstone', href: '/woodstone-lemn-pietrificat' },
    { label: 'Garduri', href: '/garduri' },
    { label: 'Borduri', href: '/borduri' },
    { label: 'Bolțari', href: '/boltari' },
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
    { label: 'Montaj', href: '/montaj' },
    { label: 'Modele de Montaj', href: '/modele-de-montaj' },
    { label: 'Ghid întreținere', href: '/intretinere' },
    { label: 'Degivrare', href: '/degivrare' },
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
