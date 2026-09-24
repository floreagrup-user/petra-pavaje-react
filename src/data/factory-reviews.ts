// Real, verified 5-star Google reviews, one per factory -- sourced live from
// the Google Business Profile links for each location (Sept 2026). Romanian
// text is either the reviewer's own original wording (Arad) or a faithful
// translation of Google's own English rendering back into Romanian for
// reviews written in a different original language than the site (Alba,
// Neamț started in Romanian and were shown to us machine-translated to
// English by Google; Prahova was written in English originally). Dates are
// month-level approximations of Google's own "X months/years ago" label,
// never exact invented days. Never edit the sentiment/facts here without
// re-checking the source -- this is what the JSON-LD Review schema quotes.
export interface FactoryReview {
  factoryId: string
  author: string
  rating: 5
  datePublished: string // YYYY-MM, approximate
  textRo: string
  textEn: string
}

export const FACTORY_REVIEWS: FactoryReview[] = [
  {
    factoryId: 'alba',
    author: 'Mihaela Cacuci',
    rating: 5,
    datePublished: '2025-12',
    textRo:
      'O grădină special gândită pentru a te ajuta să îți alegi modelul potrivit de pavaj. Găsești și alte produse montate: garduri, blocuri de zid, trepte și bănci. Varietatea de modele este impresionantă, sincer. E imposibil să vii aici și să nu găsești un model care să-ți placă.',
    textEn:
      'A garden specially designed to help you choose the right paving model. You can also find other installed products: fences, wall blocks, steps and benches. The variety of models is impressive, honestly. It is impossible to come here and not find a model you like.',
  },
  {
    factoryId: 'arad',
    author: 'Mark Pop',
    rating: 5,
    datePublished: '2025-12',
    textRo: 'Pavaje de calitate și o grădină expozițională frumoasă de unde poți să te inspiri.',
    textEn: 'Quality pavers and a beautiful exhibition garden where you can find inspiration.',
  },
  {
    factoryId: 'prahova',
    author: 'EXPEDIT3D',
    rating: 5,
    datePublished: '2024-09',
    textRo: 'Oameni de treabă și produse foarte bune.',
    textEn: 'Nice people and very good products.',
  },
  {
    factoryId: 'neamt',
    author: 'Cristian Florea',
    rating: 5,
    datePublished: '2025-12',
    textRo:
      'Am vizitat fabrica Petra Pavaje din Roman și am rămas impresionat de profesionalismul echipei. Personalul este foarte amabil, bine pregătit și gata să ofere explicații clare despre fiecare produs. Grădina expozițională este extrem de bogată, cu sute de modele de pavaj expuse, iar calitatea produselor se vede imediat, atât în finisaje, cât și în diversitatea culorilor și texturilor. O experiență excelentă pentru oricine caută pavaje de top și consultanță reală.',
    textEn:
      'I visited the Petra Pavaje factory in Roman and was impressed by the professionalism of the team. The staff is very kind, well-trained and ready to provide clear explanations about each product. The exhibition garden is extremely rich, with hundreds of paving models on display, and the quality of the products is immediately visible, both in the finishes and in the diversity of colors and textures. An excellent experience for anyone looking for top-notch paving and real consultancy.',
  },
]
