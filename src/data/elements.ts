import { ElementCategoryData } from './types'

const COLOR = {
  gri: { name: 'Gri', hex: '#808080', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-gri-1.jpg' },
  rosu: { name: 'Roșu', hex: '#b22222', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-rosu.jpg' },
  negru: { name: 'Negru', hex: '#1a1a1a', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-negru-web-1.jpg' },
  alb: { name: 'Alb', hex: '#f0f0f0', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-alb-1.jpg' },
  maro: { name: 'Maro', hex: '#8b7355', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-maro-1.avif' },
  maroDeschis: { name: 'Maro Deschis', hex: '#c19a6b', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-maro-deschis.png' },
  griAntic: { name: 'Gri Antic', hex: '#9e9e9e', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-gri-antic-web-3.jpg' },
  griBazaltic: { name: 'Gri Bazaltic', hex: '#525252', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-gri-bazaltic-web-1.avif' },
}

export const elementCategories: ElementCategoryData[] = [
  // ===================== RIGOLE =====================
  {
    slug: 'rigole',
    name: 'Rigole',
    title: 'Rigole',
    shortDescription: 'Sistem Eficient de Drenaj',
    description:
      'Rigola reprezintă o amenajare specială făcută de-a lungul străzilor, între marginea părții carosabile și bordura trotuarelor, având un rol esențial în gestionarea eficientă a apelor pluviale. Formele și dimensiunile variate le fac ușor adaptabile oricărui tip de pavaj sau suprafață — de la alei pietonale la parcări și zone cu trafic auto greu.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020/06/rigola-1200x800-1.jpg',
    gallery: [],
    heroFeatures: ['11 formate', '3 culori', 'Garanție 5 ani'],
    colors: [COLOR.gri, COLOR.rosu, COLOR.negru],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț-dezgheț',
      'Formate pentru trafic pietonal, ușor și carosabil greu',
      'Garanție 5 ani',
    ],
    advantages: [
      'Gamă completă — de la rigole pietonale la rigole carosabile pentru trafic greu',
      'Capace disponibile în variante nearmat, simplu armat și dublu armat',
      'Compatibile cu majoritatea sistemelor de pavaj Petra Pavaje',
      'Producție românească certificată',
    ],
    usage: ['Parcuri', 'Grădini', 'Parcări', 'Infrastructură rutieră'],
    variantGroups: [
      {
        name: 'Rigole scafă',
        variants: [
          { name: 'Rigolă scafă 50×20×8', code: '1272', dimensions: '50×20×8 cm', piecesPerMl: 2, piecesPerPallet: 96, weightKg: 1489, mlPerPallet: 48 },
          { name: 'Rigolă scafă 40×30×12', code: '1214', dimensions: '40×30×12 cm', piecesPerMl: 2.5, piecesPerPallet: 40, weightKg: 1285, mlPerPallet: 16 },
        ],
      },
      {
        name: 'Rigole pentru alei și trafic pietonal',
        variants: [
          { name: 'Rigolă pietonală', code: '1393', dimensions: '33×28,5×25 cm', piecesPerMl: 3, piecesPerPallet: 48, weightKg: 1657, mlPerPallet: 15.84 },
          { name: 'Casiu', code: '1676', dimensions: '35/46×50×23 cm', piecesPerMl: 2.1, piecesPerPallet: 24, weightKg: 919, mlPerPallet: 11.52 },
        ],
      },
      {
        name: 'Rigole trapezoidale',
        variants: [
          { name: 'Rigolă trapezoidală 33', code: '1392', dimensions: '66×33×46 cm', piecesPerMl: 3, piecesPerPallet: 6, weightKg: 595, mlPerPallet: 2 },
          { name: 'Rigolă trapezoidală 50', code: '2099', dimensions: '66×50×45 cm', piecesPerMl: 2, piecesPerPallet: 4, weightKg: 573, mlPerPallet: 2 },
        ],
      },
      {
        name: 'Rigole pentru infrastructură rutieră',
        variants: [
          { name: 'Rigolă acostament', code: '2096', dimensions: '60×33×25 cm', piecesPerMl: 3, piecesPerPallet: 24, weightKg: 1645, mlPerPallet: 7.92 },
          { name: 'Rigolă carosabilă', code: '2092', dimensions: '65×37×60 cm', piecesPerMl: 2.7, piecesPerPallet: 4, weightKg: 669, mlPerPallet: 1.48 },
        ],
      },
      {
        name: 'Capace rigolă carosabilă',
        note: 'Dimensiuni 49×30×15 cm',
        variants: [
          { name: 'Capac rigolă nearmat', code: '2093', dimensions: '49×30×15 cm', piecesPerMl: 3.3, piecesPerPallet: 30, weightKg: 1375, mlPerPallet: 9 },
          { name: 'Capac rigolă simplu armat', code: '2094', dimensions: '49×30×15 cm', piecesPerMl: 3.3, piecesPerPallet: 30, weightKg: 1405, mlPerPallet: 9 },
          { name: 'Capac rigolă dublu armat', code: '2095', dimensions: '49×30×15 cm', piecesPerMl: 3.3, piecesPerPallet: 30, weightKg: 1435, mlPerPallet: 9 },
        ],
      },
    ],
    documents: [
      { label: 'Rigolă scafă 50×20×8 (Gri)', productCode: '1272', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1272-RIGOLA-SCAFA-50x20x8-gri-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă scafă 50×20×8 (Roșu)', productCode: '1273', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1273-RIGOLA-SCAFA-50x20x8-rosu-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă scafă 50×20×8 (Negru)', productCode: '1274', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1274-RIGOLA-SCAFA-50x20x8-negru-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă scafă 40×30×12 (Gri)', productCode: '1214', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1214-RIGOLA-SCAFA-gri-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă scafă 40×30×12 (Roșu)', productCode: '1215', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1215-RIGOLA-SCAFA-rosu-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă scafă 40×30×12 (Negru)', productCode: '1402', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1402-RIGOLA-SCAFA-negru-cu-cant-AR-rev0.pdf' },
      { label: 'Rigolă pietonală', productCode: '1393', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1393-RIGOLA-PIETONALA-gri-AR-rev0.pdf' },
      { label: 'Rigolă trapezoidală 33', productCode: '1392', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1392-RIGOLA-TRAPEZOIDALA-gri-AR-rev0.pdf' },
      { label: 'Rigolă trapezoidală 50', productCode: '2099', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2099-RIGOLA-TRAPEZOIDALA-66x52x50-gri-AR-rev0.pdf' },
      { label: 'Rigolă acostament', productCode: '2096', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2096-RIGOLA-ACOSTAMENT-gri-AR-rev0.pdf' },
      { label: 'Rigolă carosabilă', productCode: '2092', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2092-RIGOLA-CAROSABILA-65x60x37-gri-AR-rev0.pdf' },
      { label: 'Capac rigolă nearmat', productCode: '2093', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2093-CAPAC-RIGOLA-CAROSABILA-NEARMAT-30X49X15-gri-AR-rev0.pdf' },
      { label: 'Capac rigolă simplu armat', productCode: '2094', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2094-CAPAC-RIGOLA-CAROSABILA-SIMPLU-ARMAT-30X49X15-gri-AR-rev0.pdf' },
      { label: 'Capac rigolă dublu armat', productCode: '2095', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2095-CAPAC-RIGOLA-CAROSABILA-DUBLU-ARMAT-30X49X15-gri-AR-rev0.pdf' },
    ],
    faq: [
      { question: 'La ce se folosesc rigolele?', answer: 'Rigolele se montează de-a lungul aleilor, drumurilor și parcărilor pentru a colecta și dirija apele pluviale, prevenind bălțirea și eroziunea suprafețelor.' },
      { question: 'Care este diferența dintre rigola pietonală și cea carosabilă?', answer: 'Rigola pietonală este dimensionată pentru trafic ușor (alei, grădini), în timp ce rigola carosabilă 65×37×60 cm este întărită pentru zone cu trafic auto greu.' },
      { question: 'Ce capac de rigolă aleg pentru o parcare?', answer: 'Pentru parcări cu trafic ușor este suficient capacul nearmat; pentru trafic moderat recomandăm capacul simplu armat, iar pentru trafic greu, capacul dublu armat.' },
    ],
  },

  // ===================== BOLȚARI =====================
  {
    slug: 'boltari',
    name: 'Bolțari',
    title: 'Bolțari',
    shortDescription: 'Prefabricate din Beton pentru Construcții',
    description:
      'Bolțarii din beton sunt soluția sigură, rapidă și economică de realizare a unei lucrări de zidărie sau fundație, indiferent că este vorba de casă, anexele acesteia sau clădiri industriale. Rezistența deosebită, chiar și în medii umede, îi recomandă inclusiv pentru construcția pivnițelor și a cramelor.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020/06/boltari-1200x800-1.jpg',
    gallery: [],
    heroFeatures: ['13 formate', 'Culoare Gri', 'Garanție 5 ani'],
    colors: [COLOR.gri],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență ridicată, inclusiv în medii umede',
      'Sistem Nut-Feder disponibil pentru îmbinare rapidă',
      'Garanție 5 ani',
    ],
    advantages: [
      'Gamă completă — fundație, Nut-Feder, stâlp și zidărie',
      'Soluție rapidă și economică față de zidăria clasică',
      'Potriviți pentru pivnițe și crame datorită rezistenței la umiditate',
      'Producție românească certificată',
    ],
    usage: ['Fundații', 'Pereți despărțitori', 'Stâlpi', 'Anexe gospodărești'],
    variantGroups: [
      {
        name: 'Bolțari fundație',
        variants: [
          { name: 'Bolțar fundație 50×15×25', code: '1287', dimensions: '50×15×25 cm', piecesPerMl: 8, piecesPerPallet: 80, weightKg: 1649, mlPerPallet: 10 },
          { name: 'Bolțar fundație 50×20×25', code: '1220', dimensions: '50×20×25 cm', piecesPerMl: 8, piecesPerPallet: 60, weightKg: 1294, mlPerPallet: 7.5 },
          { name: 'Bolțar fundație 50×25×25', code: '1221', dimensions: '50×25×25 cm', piecesPerMl: 8, piecesPerPallet: 50, weightKg: 1175, mlPerPallet: 6.25 },
          { name: 'Bolțar fundație 50×30×25', code: '1222', dimensions: '50×30×25 cm', piecesPerMl: 8, piecesPerPallet: 40, weightKg: 1087, mlPerPallet: 5 },
        ],
      },
      {
        name: 'Bolțari fundație Nut-Feder',
        note: 'Sistem de îmbinare Nut-Feder pentru montaj rapid și precis',
        variants: [
          { name: 'Bolțar fundație Nut-Feder 50×15×25', code: '1768', dimensions: '50×15×25 cm', piecesPerMl: 8, weightKg: '—' },
          { name: 'Bolțar fundație Nut-Feder 50×20×25', code: '1769', dimensions: '50×20×25 cm', piecesPerMl: 8, weightKg: '—' },
          { name: 'Bolțar fundație Nut-Feder 50×25×25', code: '1770', dimensions: '50×25×25 cm', piecesPerMl: 8, weightKg: '—' },
          { name: 'Bolțar fundație Nut-Feder 50×30×25', code: '1771', dimensions: '50×30×25 cm', piecesPerMl: 8, weightKg: '—' },
        ],
      },
      {
        name: 'Bolțari stâlp',
        variants: [
          { name: 'Bolțar stâlp 25×25×25', code: '1223', dimensions: '25×25×25 cm', piecesPerMl: 16, piecesPerPallet: 60, weightKg: 895, mlPerPallet: 3.75 },
          { name: 'Bolțar stâlp 30×30×25', code: '1397', dimensions: '30×30×25 cm', piecesPerMl: '—', piecesPerPallet: 45, weightKg: 858, mlPerPallet: 4.05 },
        ],
      },
      {
        name: 'Bolțari zidărie',
        variants: [
          { name: 'Bolțar zidărie 50×12×23,8', code: '1224', dimensions: '50×12×23,8 cm', piecesPerMl: 8.4, piecesPerPallet: 80, weightKg: 1505, mlPerPallet: 9.5 },
          { name: 'Bolțar zidărie 50×20×23,8', code: '1396', dimensions: '50×20×23,8 cm', piecesPerMl: 8.4, weightKg: '—' },
          { name: 'Bolțar zidărie 50×25×23,8', code: '1225', dimensions: '50×25×23,8 cm', piecesPerMl: 8.4, piecesPerPallet: 50, weightKg: 1708, mlPerPallet: 5.9 },
        ],
      },
    ],
    documents: [
      { label: 'Bolțar fundație 50×15×25', productCode: '1287', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-FUNDATIE-50x15x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar fundație 50×20×25', productCode: '1220', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-FUNDATIE-50x20x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar fundație 50×25×25', productCode: '1221', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-FUNDATIE-50x25x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar fundație 50×30×25', productCode: '1222', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-FUNDATIE-50x30x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar stâlp 25×25×25', productCode: '1223', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-STALP-25x25x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar stâlp 30×30×25', productCode: '1397', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-STALP-30x30x25-Petra-Pavaje.pdf' },
      { label: 'Bolțar zidărie 50×12×23,8', productCode: '1224', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-ZIDARIE-50x12x23.8-Petra-Pavaje.pdf' },
      { label: 'Bolțar zidărie 50×20×23,8', productCode: '1396', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-ZIDARIE-50x20x23.8.pdf' },
      { label: 'Bolțar zidărie 50×25×23,8', productCode: '1225', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-BOLTAR-ZIDARIE-50x25x23.8-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'În ce culoare sunt disponibili bolțarii?', answer: 'Toți bolțarii Petra Pavaje sunt disponibili în Gri.' },
      { question: 'Ce este sistemul Nut-Feder la bolțari?', answer: 'Este un sistem de îmbinare cu proeminență și canal complementar, care ghidează și blochează bolțarii unul de celălalt, pentru un montaj mai rapid și mai precis.' },
      { question: 'Pot fi folosiți bolțarii pentru pivnițe?', answer: 'Da, rezistența deosebită a bolțarilor, inclusiv în medii umede, îi recomandă pentru pivnițe și crame.' },
    ],
  },

  // ===================== JARDINIERE =====================
  {
    slug: 'jardiniere',
    name: 'Jardiniere',
    title: 'Jardiniere',
    shortDescription: 'Accesorii pentru Grădina Ta',
    description:
      'Jardinierele sunt o soluție rapidă și elegantă pentru amenajarea spațiilor verzi, ușor de asortat cu pavajele Petra Pavaje. Dimensiunile variate permit crearea unor compoziții unice pentru terase, grădini și spații de agrement.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Jardiniera-40-x-30-x-25cm-rosu-Large.avif',
    gallery: [],
    heroFeatures: ['2 dimensiuni', '5 culori', 'Garanție 5 ani'],
    colors: [COLOR.gri, COLOR.rosu, COLOR.maro, COLOR.maroDeschis, COLOR.negru],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț-dezgheț',
      'Formă rotundă și rectangulară',
      'Garanție 5 ani',
    ],
    advantages: [
      '5 culori disponibile pentru asortare cu orice amenajare',
      'Două dimensiuni, pentru compoziții variate',
      'Montaj simplu, fără fundație',
      'Producție românească certificată',
    ],
    usage: ['Terase', 'Grădini', 'Curți', 'Spații de agrement'],
    variantGroups: [
      {
        name: 'Jardiniere',
        variants: [
          { name: 'Jardinieră 40×30×25', code: '1386', dimensions: '40×30×25 cm', piecesPerMl: 2.5, piecesPerPallet: 30, weightKg: 1195 },
          { name: 'Jardinieră rotundă 35×28×20', code: '1736', dimensions: '35×28×20 cm', piecesPerMl: 3.65, piecesPerPallet: 40, weightKg: 685 },
        ],
      },
    ],
    documents: [
      { label: 'Jardinieră 40×30×25 (toate culorile)', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-JARDINIERA-Petra-Pavaje.pdf' },
      { label: 'Jardinieră 40×30×25 (Gri)', productCode: '1386', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1386-jardiniera-gri-AR-rev-0.pdf' },
      { label: 'Jardinieră 40×30×25 (Roșu)', productCode: '1380', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1380-jardiniera-rosu-AR-rev-0.pdf' },
      { label: 'Jardinieră 40×30×25 (Maro)', productCode: '1381', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1381-jardiniera-maro-AR-rev-0.pdf' },
      { label: 'Jardinieră 40×30×25 (Maro Deschis)', productCode: '1379', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1379-jardiniera-maro-deschis-AR-rev0.pdf' },
      { label: 'Jardinieră 40×30×25 (Negru)', productCode: '1382', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1382-jardiniera-negru-AR-rev-0.pdf' },
    ],
    faq: [
      { question: 'În ce culori sunt disponibile jardinierele?', answer: 'În 5 culori: Gri, Roșu, Maro, Maro Deschis și Negru.' },
      { question: 'Ce dimensiuni de jardinieră sunt disponibile?', answer: 'Jardiniera rectangulară 40×30×25 cm și jardiniera rotundă 35×28×20 cm, pentru compoziții variate.' },
      { question: 'Este nevoie de fundație pentru montarea jardinierelor?', answer: 'Nu, jardinierele Petra Pavaje se așază direct pe o suprafață stabilă, fără lucrări de fundație.' },
    ],
  },

  // ===================== PALISADĂ =====================
  {
    slug: 'palisada',
    name: 'Palisadă',
    title: 'Palisadă',
    shortDescription: 'Structură și Contur pentru Grădina Ta',
    description:
      'Palisadele reprezintă o soluție elegantă și practică în arta amenajărilor peisagistice, esențiale pentru a conferi structură și un contur bine definit spațiilor verzi. Sunt proiectate să reziste condițiilor meteo diverse, incluzând rezistența la îngheț, umiditate și raze UV.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada.avif',
    gallery: [],
    heroFeatures: ['47×12,5×15 cm', '4 culori', 'Garanție 5 ani'],
    colors: [COLOR.alb, COLOR.negru, COLOR.griAntic, COLOR.griBazaltic],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț, umiditate și raze UV',
      'Garanție 5 ani',
    ],
    advantages: [
      '4 culori, inclusiv nuanțe antichizate',
      'Conferă structură și contur bine definit spațiilor verzi',
      'Durabilitate ridicată în timp',
      'Producție românească certificată',
    ],
    usage: ['Grădini', 'Amenajări peisagistice', 'Delimitare spații verzi'],
    variantGroups: [
      {
        name: 'Palisadă',
        variants: [
          { name: 'Palisadă 47×12,5×15', code: '1406', dimensions: '47×12,5×15 cm', piecesPerMl: 6.6, piecesPerPallet: 64, weightKg: 1273, mlPerPallet: 9.6 },
        ],
      },
    ],
    documents: [
      { label: 'Palisadă 47×12,5×15 (Alb)', productCode: '1406', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1406-Palisada-alb-AR-rev-0.pdf' },
      { label: 'Palisadă 47×12,5×15 (Negru)', productCode: '1407', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1407-Palisada-negru-AR-rev-0.pdf' },
    ],
    faq: [
      { question: 'În ce culori este disponibilă palisada?', answer: 'În 4 culori: Alb, Negru, Gri Antic și Gri Bazaltic.' },
      { question: 'Este rezistentă palisada la îngheț?', answer: 'Da, palisada Petra Pavaje este proiectată să reziste la îngheț, umiditate și raze UV.' },
    ],
  },

  // ===================== BĂNCI =====================
  {
    slug: 'banci',
    name: 'Bănci',
    title: 'Bănci',
    shortDescription: 'Soluții Robuste pentru Spații Exterioare',
    description:
      'Băncile din beton reprezintă o soluție robustă și estetică pentru amenajarea spațiilor exterioare, combinând funcționalitatea cu o durabilitate remarcabilă. Sunt ideale pentru o varietate de locații, de la grădini private și curți, la parcuri publice, piețe, centre comerciale și complexe rezidențiale.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020/06/banci-1200x800-1.jpg',
    gallery: [],
    heroFeatures: ['Mobilier urban', '4 culori', 'Garanție 5 ani'],
    colors: [COLOR.rosu, COLOR.maroDeschis, COLOR.negru, COLOR.maro],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la intemperii',
      'Garanție 5 ani',
    ],
    advantages: [
      'Combină funcționalitatea cu o durabilitate remarcabilă',
      'Potrivite pentru spații private și publice deopotrivă',
      '4 culori disponibile',
      'Producție românească certificată',
    ],
    usage: ['Grădini private', 'Curți', 'Parcuri publice', 'Piețe', 'Centre comerciale'],
    variantGroups: [],
    faq: [
      { question: 'Unde pot fi folosite băncile din beton Petra Pavaje?', answer: 'În grădini private, curți, parcuri publice, piețe, centre comerciale și complexe rezidențiale.' },
      { question: 'În ce culori sunt disponibile băncile?', answer: 'În Roșu, Maro Deschis, Negru și Maro.' },
    ],
  },

  // ===================== TREAPTĂ =====================
  {
    slug: 'treapta',
    name: 'Treaptă',
    title: 'Treaptă',
    shortDescription: 'Soluții pentru Diferențe de Nivel',
    description:
      'Transformă diferențele de nivel din grădină, terasă sau intrarea casei cu treptele din beton — soluția ideală ce combină estetica cu funcționalitatea. Fabricate pentru a rezista intemperiilor, ciclurilor de îngheț-dezgheț și traficului pietonal, treptele din beton oferă o suprafață stabilă și sigură.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/treapta.avif',
    gallery: [],
    heroFeatures: ['2 dimensiuni', '5 culori', 'Garanție 5 ani'],
    colors: [COLOR.alb, COLOR.negru, COLOR.griAntic, COLOR.griBazaltic, COLOR.gri],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț-dezgheț și trafic pietonal',
      'Suprafață stabilă și sigură',
      'Garanție 5 ani',
    ],
    advantages: [
      'Două formate — compact și lat — pentru orice tip de scară',
      'Până la 5 culori disponibile în funcție de format',
      'Combină estetica cu funcționalitatea',
      'Producție românească certificată',
    ],
    usage: ['Scări exterioare', 'Terase', 'Grădini', 'Intrări cu diferență de nivel'],
    variantGroups: [
      {
        name: 'Trepte',
        variants: [
          { name: 'Treaptă 50×37,5×15', code: '1410', dimensions: '50×37,5×15 cm', piecesPerMl: 2, piecesPerPallet: 24, weightKg: 1429 },
          { name: 'Treaptă 100×35×15', code: '1782', dimensions: '100×35×15 cm', piecesPerMl: 1, piecesPerPallet: 10, weightKg: 1275 },
        ],
      },
    ],
    documents: [
      { label: 'Treaptă 50×37,5×15 (Alb)', productCode: '1410', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1410-Treapta-alb-AR-rev-0.pdf' },
      { label: 'Treaptă 50×37,5×15 (Negru)', productCode: '1411', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1411-Treapta-negru-AR-rev-0.pdf' },
      { label: 'Treaptă 100×35×15 (Negru)', productCode: '1765', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1765-Treapta-100X35X15-NEGRU-NT-rev-0.pdf' },
    ],
    faq: [
      { question: 'Ce formate de treaptă sunt disponibile?', answer: 'Treaptă 50×37,5×15 cm (compactă, pentru scări exterioare) și treaptă 100×35×15 cm (lată, pentru trafic pietonal intens).' },
      { question: 'Rezistă treptele la îngheț?', answer: 'Da, sunt fabricate pentru a rezista intemperiilor și ciclurilor repetate de îngheț-dezgheț.' },
    ],
  },

  // ===================== BLOC DE ZID =====================
  {
    slug: 'bloc-de-zid',
    name: 'Bloc de zid',
    title: 'Bloc de zid',
    shortDescription: 'Structuri Durabile și Versatile',
    description:
      'Construiește structuri durabile și bine definite cu blocurile de zid — soluția robustă și versatilă pentru o varietate de proiecte de amenajare. Cu un aspect curat și posibilități multiple de configurare, permit delimitarea, structurarea și personalizarea eficientă a grădinii sau curții.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Bloc-de-zid-alb-Large.avif',
    gallery: [],
    heroFeatures: ['50×25×15 cm', '4 culori', 'Garanție 5 ani'],
    colors: [COLOR.alb, COLOR.negru, COLOR.griAntic, COLOR.griBazaltic],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț-dezgheț',
      'Garanție 5 ani',
    ],
    advantages: [
      '4 culori disponibile, inclusiv nuanțe antichizate',
      'Aspect curat, cu posibilități multiple de configurare',
      'Potrivit pentru garduri și ziduri de susținere',
      'Producție românească certificată',
    ],
    usage: ['Garduri', 'Ziduri de susținere', 'Amenajări peisagistice'],
    variantGroups: [
      {
        name: 'Bloc de zid',
        variants: [
          { name: 'Bloc de zid 50×25×15', code: '1408', dimensions: '50×25×15 cm', piecesPerMl: 2, piecesPerPallet: 40, weightKg: 1585, mlPerPallet: 20 },
        ],
      },
    ],
    documents: [
      { label: 'Bloc de zid 50×25×15 (Alb)', productCode: '1408', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1408-Bloc-zid-alb-AR-rev-0.pdf' },
      { label: 'Bloc de zid 50×25×15 (Negru)', productCode: '1409', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1409-Bloc-zid-negru-AR-rev-0.pdf' },
    ],
    faq: [
      { question: 'În ce culori este disponibil blocul de zid?', answer: 'În 4 culori: Alb, Negru, Gri Antic și Gri Bazaltic.' },
      { question: 'Pentru ce se recomandă blocul de zid?', answer: 'Pentru construcția gardurilor, a zidurilor de susținere și a altor structuri de delimitare din grădină sau curte.' },
    ],
  },

  // ===================== GARDURI: ROBUSTO =====================
  {
    slug: 'robusto',
    parent: { slug: 'garduri', name: 'Garduri' },
    name: 'Robusto',
    title: 'Robusto',
    shortDescription: 'Rezistență și Stabilitate',
    description:
      'Elementele de gard Robusto sunt soluția ideală pentru cei care doresc un gard masiv, cu aspect robust și durabil în timp. Disponibile cu elemente pline, jumătăți și capace de stâlp, gama variată de culori permite adaptarea la orice stil arhitectural. Grosimea de 16 cm asigură o rezistență deosebită la condițiile meteo nefavorabile.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-Robusto-Petra-Pavaje.jpg',
    gallery: [],
    heroFeatures: ['4 variante', '5 culori', 'Garanție 5 ani'],
    colors: [COLOR.maroDeschis, COLOR.rosu, COLOR.negru, COLOR.gri, COLOR.griAntic],
    technicalFeatures: [
      'Grosime 16 cm pentru rezistență sporită',
      'Beton vibropresat de înaltă densitate',
      'Rezistență la condiții meteo nefavorabile',
      'Garanție 5 ani',
    ],
    advantages: [
      'Aspect masiv și robust, pentru garduri cu prezență',
      'Gamă completă — element, jumătate și capace',
      '5 culori disponibile',
      'Producție românească certificată',
    ],
    usage: ['Garduri rezidențiale', 'Delimitare proprietăți'],
    variantGroups: [
      {
        name: 'Elemente gard Robusto',
        variants: [
          { name: 'Element gard', code: '1387', dimensions: '40×20×16 cm', piecesPerMl: 2.5, piecesPerPallet: 60, weightKg: 970, mlPerPallet: 24 },
          { name: 'Element gard jumătate', code: '1388', dimensions: '20×20×16 cm', piecesPerMl: 5, piecesPerPallet: 120, weightKg: 1003, mlPerPallet: 24 },
          { name: 'Capac gard', code: '1389', dimensions: '47×27×5 cm', piecesPerMl: 2.1, piecesPerPallet: 40, weightKg: 575, mlPerPallet: 18.8 },
          { name: 'Capac gard stâlp', code: '1729', dimensions: '48×48×5,5 cm', piecesPerMl: 2.09, piecesPerPallet: 32, weightKg: 1305, mlPerPallet: 19.2 },
        ],
      },
    ],
    documents: [
      { label: 'Element gard 40×20×16', productCode: '1387', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-ELEMENT-GARD-ROBUSTO-DUBLU-40x20x16-Petra-Pavaje.pdf' },
      { label: 'Element gard jumătate 20×20×16', productCode: '1388', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-ELEMENT-GARD-ROBUSTO-SIMPLU-20x20x16-Petra-Pavaje.pdf' },
      { label: 'Capac gard 47×27×5', productCode: '1389', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-CAPAC-GARD-ROBUSTO-47x20x5-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Ce grosime au elementele de gard Robusto?', answer: 'Elementele Robusto au grosimea de 16 cm, oferind o rezistență sporită față de modelele standard.' },
      { question: 'În ce culori este disponibil gardul Robusto?', answer: 'În 5 culori: Maro Deschis, Roșu, Negru, Gri și Gri Antic.' },
    ],
  },

  // ===================== GARDURI: MODERN =====================
  {
    slug: 'modern',
    parent: { slug: 'garduri', name: 'Garduri' },
    name: 'Modern',
    title: 'Modern',
    shortDescription: 'Design Minimalist 3D',
    description:
      'Elementele de gard Modern sunt produse de tip 3D, modulare, cu toate părțile finisate, care se autoaliniază și se autoblochează datorită îmbinării de tip Nut-Feder. Sistemul inovator de asamblare face montarea rapidă și eficientă, iar designul minimalist se potrivește cu majoritatea stilurilor arhitecturale.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/9.-Gard-Modern-negru-si-maro-deschis.avif',
    gallery: [],
    heroFeatures: ['2 dimensiuni', '3 culori', 'Sistem Nut-Feder'],
    colors: [COLOR.negru, COLOR.alb, COLOR.maroDeschis],
    technicalFeatures: [
      'Sistem Nut-Feder — autoaliniere și autoblocare',
      'Toate fețele finisate (produs 3D)',
      'Beton vibropresat de înaltă densitate',
    ],
    advantages: [
      'Montaj rapid și eficient datorită sistemului Nut-Feder',
      'Design minimalist, potrivit oricărui stil arhitectural',
      'Toate părțile finisate — fără o față "din spate"',
      'Producție românească certificată',
    ],
    usage: ['Garduri rezidențiale', 'Amenajări moderne'],
    variantGroups: [
      {
        name: 'Elemente gard Modern',
        variants: [
          { name: 'Element gard 60×30×9', code: '—', dimensions: '60×30×9 cm', piecesPerMl: 1.67, piecesPerPallet: 32, weightKg: 633, mlPerPallet: 19.2 },
          { name: 'Element gard 60×30×7,5', code: '—', dimensions: '60×30×7,5 cm', piecesPerMl: 1.67, piecesPerPallet: 48, weightKg: 1427, mlPerPallet: 28.8 },
        ],
      },
    ],
    faq: [
      { question: 'Ce este sistemul Nut-Feder la gardul Modern?', answer: 'Este un sistem de îmbinare cu proeminență și canal complementar, care aliniază și blochează automat elementele între ele la montaj, fără elemente de fixare suplimentare.' },
      { question: 'În ce culori este disponibil gardul Modern?', answer: 'În Negru, Alb și Maro Deschis.' },
    ],
  },

  // ===================== GARDURI: BAROC =====================
  {
    slug: 'baroc',
    parent: { slug: 'garduri', name: 'Garduri' },
    name: 'Baroc',
    title: 'Baroc',
    shortDescription: 'Eleganță Clasică în Beton',
    description:
      'Elementele de gard Baroc îmbină eleganța clasică cu robustețea betonului. Disponibile în variante element, jumătate, stâlp și stâlp dublu — inclusiv formatele extinse "Vintage" — oferă flexibilitate maximă în proiectarea gardului potrivit pentru orice proprietate.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Gard-Baroc-alb-maro-deschis-negru.avif',
    gallery: [],
    heroFeatures: ['6 variante', '5 culori', 'Garanție 5 ani'],
    colors: [COLOR.negru, COLOR.alb, COLOR.maroDeschis, COLOR.griAntic, COLOR.griBazaltic],
    technicalFeatures: [
      'Beton vibropresat de înaltă densitate',
      'Rezistență la îngheț-dezgheț',
      'Garanție 5 ani',
    ],
    advantages: [
      'Aspect clasic, elegant, potrivit reședințelor rezidențiale',
      '6 variante — element, jumătate, stâlp, stâlp dublu și formate extinse',
      '5 culori disponibile, inclusiv nuanțe antichizate',
      'Producție românească certificată',
    ],
    usage: ['Garduri rezidențiale', 'Delimitare proprietăți', 'Amenajări clasice'],
    variantGroups: [
      {
        name: 'Elemente gard Baroc',
        variants: [
          { name: 'Element gard', code: '1634', dimensions: '40×20×20 cm', piecesPerMl: 2.5, piecesPerPallet: 48, weightKg: 1585, mlPerPallet: 19.2 },
          { name: 'Element gard jumătate', code: '1636', dimensions: '20×20×20 cm', piecesPerMl: 5, piecesPerPallet: 96, weightKg: 1585, mlPerPallet: 19.2 },
          { name: 'Element stâlp', code: '1443', dimensions: '40×20×20 cm', piecesPerMl: 5, piecesPerPallet: 48, weightKg: 1585, mlPerPallet: 9.6 },
          { name: 'Element stâlp dublu', code: '1445', dimensions: '40×40×20 cm', piecesPerMl: 5, piecesPerPallet: 24, weightKg: 1585, mlPerPallet: 4.8 },
          { name: 'Element gard (Vintage)', code: '1399', dimensions: '48×20×20 cm', piecesPerMl: 2.08, piecesPerPallet: 48, weightKg: 1777, mlPerPallet: 23 },
          { name: 'Element gard jumătate (Vintage)', code: '1400', dimensions: '24×20×20 cm', piecesPerMl: 4.16, piecesPerPallet: 96, weightKg: 1801, mlPerPallet: 23 },
        ],
      },
    ],
    faq: [
      { question: 'Ce diferențiază formatele Vintage la gardul Baroc?', answer: 'Formatele Vintage (48×20×20 și 24×20×20 cm) au o textură antichizată mai pronunțată și dimensiuni ușor extinse față de elementele Baroc standard.' },
      { question: 'În ce culori este disponibil gardul Baroc?', answer: 'În Negru, Alb, Maro Deschis, Gri Antic și Gri Bazaltic.' },
    ],
  },

  // ===================== CANALIZARE: BLOC DE BETON =====================
  {
    slug: 'bloc-de-beton',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Bloc de beton',
    title: 'Bloc de beton',
    shortDescription: 'Elemente de Zidărie pentru Construcții',
    description:
      'Blocurile de beton reprezintă elemente de zidărie esențiale în construcții, fabricate dintr-un amestec de ciment, apă, nisip și pietriș. Disponibile în două dimensiuni mari, sunt ideale pentru construcția pereților, gardurilor, fundațiilor și a altor structuri, inclusiv a căminelor și structurilor de canalizare.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/bloc-de-beton-120x60x60.webp',
    gallery: [],
    heroFeatures: ['2 dimensiuni', 'Culoare Gri', 'Garanție 5 ani'],
    colors: [COLOR.gri],
    technicalFeatures: ['Rezistență ridicată la compresiune', 'Beton vibropresat de înaltă densitate'],
    advantages: [
      'Format mare, pentru structuri de canalizare și cămine',
      'Format compact, versatil pentru diverse aplicații',
      'Ușor de manipulat și montat',
    ],
    usage: ['Cămine de canalizare', 'Ziduri', 'Fundații'],
    variantGroups: [
      {
        name: 'Bloc de beton',
        variants: [
          { name: 'Bloc de beton 120×60×60', code: '2097', dimensions: '120×60×60 cm', piecesPerMl: 0.83, piecesPerPallet: 1050, weightKg: '—' },
          { name: 'Bloc de beton 60×60×60', code: '2098', dimensions: '60×60×60 cm', piecesPerMl: 1.66, piecesPerPallet: 500, weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Bloc de beton (fișă tehnică generală)', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Bloc-de-beton-rev0.pdf' },
      { label: 'Bloc de beton 120×60×60', productCode: '2097', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2097-Declaratie-performanta-Bloc-de-beton-1200x600x600-rev0.pdf' },
      { label: 'Bloc de beton 60×60×60', productCode: '2098', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2098-Declaratie-performanta-Bloc-de-beton-600x600x600-rev0.pdf' },
    ],
    faq: [
      { question: 'Ce dimensiuni de bloc de beton sunt disponibile?', answer: '120×60×60 cm și 60×60×60 cm.' },
    ],
  },

  // ===================== CANALIZARE: CĂMINE 1000mm =====================
  {
    slug: 'elemente-pentru-camine-1000-mm',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Elemente pentru cămine 1000 mm',
    title: 'Elemente pentru cămine — diametrul 1000 mm',
    shortDescription: 'Beton rezistent pentru infrastructură',
    description:
      'Realizate din beton puternic și dens, elementele pentru cămine cu diametrul 1000 mm sunt capabile să reziste la infiltrații și la atacuri din medii corozive. Elementele de bază integrează o fundație și asigură un racord etanș la rețelele de canalizare, fiind disponibile într-o gamă de adâncimi standard.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/element-de-baza-pentru-camine-800-mm-petra-pavaje.webp',
    gallery: [],
    heroFeatures: ['Ø 1000 mm', 'Rezistență la coroziune', 'Garanție 2 ani'],
    colors: [],
    technicalFeatures: ['Beton dens, rezistent la infiltrații', 'Racord etanș la rețeaua de canalizare', 'Rezistență la medii corozive'],
    advantages: ['Element de bază cu fundație integrată', 'Disponibil în mai multe adâncimi standard', 'Producție românească certificată'],
    usage: ['Rețele de canalizare', 'Cămine de vizitare'],
    variantGroups: [
      {
        name: 'Element de bază — Ø 1000 mm',
        variants: [
          { name: 'De 1240 / H 500', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 500 mm, Dmax 250 mm', weightKg: 800 },
          { name: 'De 1240 / H 750', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 750 mm, Dmax 315 mm', weightKg: 1030 },
          { name: 'De 1240 / H 1000', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 1000 mm, Dmax 500 mm', weightKg: 1280 },
          { name: 'De 1300 / H 500', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 500 mm, Dmax 250 mm', weightKg: 1169 },
          { name: 'De 1300 / H 750', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 750 mm, Dmax 315 mm', weightKg: 1496 },
          { name: 'De 1300 / H 1000', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 1000 mm, Dmax 500 mm', weightKg: 1823 },
        ],
      },
      {
        name: 'Element de bază cu jgheab — Ø 1000 mm',
        variants: [
          { name: 'De 1240 / H 500 (cu jgheab)', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 500 mm', weightKg: '—' },
          { name: 'De 1240 / H 750 (cu jgheab)', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 750 mm', weightKg: '—' },
          { name: 'De 1240 / H 1000 (cu jgheab)', code: '—', dimensions: 'De 1240 mm, di 1000 mm, g 120 mm, H 1000 mm', weightKg: '—' },
          { name: 'De 1300 / H 500 (cu jgheab)', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 500 mm', weightKg: '—' },
          { name: 'De 1300 / H 750 (cu jgheab)', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 750 mm', weightKg: '—' },
          { name: 'De 1300 / H 1000 (cu jgheab)', code: '—', dimensions: 'De 1300 mm, di 1000 mm, g 150 mm, H 1000 mm', weightKg: '—' },
        ],
      },
      {
        name: 'Inele — Ø 1000 mm',
        variants: [
          { name: 'Inel De 1240 / H 250', code: '—', dimensions: 'De 1240 mm, g 120 mm, H 250 mm', weightKg: '—' },
          { name: 'Inel De 1240 / H 500', code: '—', dimensions: 'De 1240 mm, g 120 mm, H 500 mm', weightKg: '—' },
          { name: 'Inel De 1240 / H 750', code: '—', dimensions: 'De 1240 mm, g 120 mm, H 750 mm', weightKg: '—' },
          { name: 'Inel De 1240 / H 1000', code: '—', dimensions: 'De 1240 mm, g 120 mm, H 1000 mm', weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Element de bază — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-1000-mm-elemente-de-baza-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-1000-mm-elemente-de-baza-cu-jgheab-Petra-Pavaje.pdf' },
      { label: 'Inele — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-1000-mm-INELE-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1240 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2015-Declaratie-performanta-Element-de-baza-di-1000-H-500-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1240 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2016-Declaratie-performanta-Element-de-baza-di-1000-H-750-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1240 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2017-Declaratie-performanta-Element-de-baza-di-1000-H-1000-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1300 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2018-Declaratie-performanta-Element-de-baza-di-1000-H-500-g-150-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1300 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2019-Declaratie-performanta-Element-de-baza-di-1000-H-750-g-150-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1300 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020-Declaratie-performanta-Element-de-baza-di-1000-H-1000-g-150-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1240 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2021-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-500-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1240 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2022-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-750-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1240 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2023-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-1000-g-120-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1300 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2024-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-500-g-150-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1300 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2025-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-750-g-150-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1300 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2026-Declaratie-performanta-Element-de-baza-cu-jgheab-di-1000-H-1000-g-150-Petra-Pavaje.pdf' },
      { label: 'Inel De 1240 / H 250', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2027-Declaratie-performanta-Inel-pentru-camin-di-1000-H-250-Petra-Pavaje.pdf' },
      { label: 'Inel De 1240 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2028-Declaratie-performanta-Inel-pentru-camin-di-1000-H-500-Petra-Pavaje.pdf' },
      { label: 'Inel De 1240 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2029-Declaratie-performanta-Inel-pentru-camin-di-1000-H-750-Petra-Pavaje.pdf' },
      { label: 'Inel De 1240 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2030-Declaratie-performanta-Inel-pentru-camin-di-1000-H-1000-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Ce reprezintă De, di, g, H la elementele de cămin?', answer: 'De este diametrul exterior, di diametrul interior, g grosimea peretelui, iar H înălțimea elementului — toate exprimate în milimetri.' },
      { question: 'La ce se folosesc elementele pentru cămine de 1000 mm?', answer: 'Sunt folosite pentru construcția căminelor de vizitare, racord și inspecție ale rețelelor de canalizare.' },
      { question: 'Ce este elementul de bază cu jgheab?', answer: 'Este o variantă a elementului de bază care preia apele pluviale și le direcționează spre ieșirea din interiorul căminului.' },
      { question: 'La ce sunt folosite inelele?', answer: 'Inelele se montează peste elementul de bază pentru a ajusta înălțimea totală a căminului, în funcție de adâncimea necesară.' },
    ],
  },

  // ===================== CANALIZARE: CĂMINE 800mm =====================
  {
    slug: 'elemente-pentru-camine-800-mm',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Elemente pentru cămine 800 mm',
    title: 'Elemente pentru cămine — diametrul 800 mm',
    shortDescription: 'Beton rezistent pentru infrastructură',
    description:
      'Căminele de vizitare, de racord sau de inspecție sunt proiectate pentru a facilita accesul la rețelele de canalizare prin care sunt transportate apele uzate, meteorice și cele de șiroire, prin curgere la nivel sau sub presiune scăzută. Elementele de bază cu jgheab ajută la direcționarea apelor pluviale spre ieșirea din cămin.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/element-de-baza-pentru-camine-800-mm-petra-pavaje.webp',
    gallery: [],
    heroFeatures: ['Ø 800 mm', 'Cu sau fără jgheab', 'Garanție 2 ani'],
    colors: [],
    technicalFeatures: ['Beton dens, rezistent la infiltrații', 'Variantă cu jgheab pentru direcționarea apelor pluviale', 'Racord etanș la rețea'],
    advantages: ['Facilitează accesul pentru reparații și întreținere', 'Permite schimbarea direcției și/sau nivelului rețelei', 'Producție românească certificată'],
    usage: ['Rețele de canalizare', 'Cămine de vizitare și inspecție'],
    variantGroups: [
      {
        name: 'Element de bază — Ø 800 mm',
        variants: [
          { name: 'De 1040 / H 500', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 500 mm, Dmax 250 mm', weightKg: 500 },
          { name: 'De 1040 / H 750', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 750 mm, Dmax 315 mm', weightKg: 740 },
          { name: 'De 1040 / H 1000', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 1000 mm, Dmax 500 mm', weightKg: 950 },
        ],
      },
      {
        name: 'Element de bază cu jgheab — Ø 800 mm',
        variants: [
          { name: 'De 1040 / H 500 (cu jgheab)', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 500 mm, Dmax 250 mm', weightKg: 680 },
          { name: 'De 1040 / H 750 (cu jgheab)', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 750 mm, Dmax 315 mm', weightKg: 940 },
          { name: 'De 1040 / H 1000 (cu jgheab)', code: '—', dimensions: 'De 1040 mm, di 800 mm, g 120 mm, H 1000 mm, Dmax 500 mm', weightKg: 1120 },
        ],
      },
      {
        name: 'Inele — Ø 800 mm',
        variants: [
          { name: 'Inel De 1040 / H 250', code: '—', dimensions: 'De 1040 mm, g 120 mm, H 250 mm', weightKg: '—' },
          { name: 'Inel De 1040 / H 500', code: '—', dimensions: 'De 1040 mm, g 120 mm, H 500 mm', weightKg: '—' },
          { name: 'Inel De 1040 / H 750', code: '—', dimensions: 'De 1040 mm, g 120 mm, H 750 mm', weightKg: '—' },
          { name: 'Inel De 1040 / H 1000', code: '—', dimensions: 'De 1040 mm, g 120 mm, H 1000 mm', weightKg: '—' },
        ],
      },
      {
        name: 'Cap tronconic',
        variants: [
          { name: 'Cap tronconic Ø 800/600', code: '—', dimensions: 'De 800 mm / 600 mm', weightKg: '—' },
        ],
      },
      {
        name: 'Inele de aducere la cotă',
        variants: [
          { name: 'Inel de aducere la cotă H 60', code: '—', dimensions: 'H 60 mm', weightKg: '—' },
          { name: 'Inel de aducere la cotă H 100', code: '—', dimensions: 'H 100 mm', weightKg: '—' },
          { name: 'Inel de aducere la cotă H 150', code: '—', dimensions: 'H 150 mm', weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Element de bază De 1040 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2001-Declaratie-performanta-Element-de-baza-di-800-H-500-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1040 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2002-Declaratie-performanta-Element-de-baza-di-800-H-750-Petra-Pavaje.pdf' },
      { label: 'Element de bază De 1040 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2003-Declaratie-performanta-Element-de-baza-di-800-H-1000-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-800-mm-elemente-de-baza-cu-jgheab-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1040 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2004-Declaratie-performanta-Element-de-baza-cu-jgheab-di-800-H-500-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1040 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2005-Declaratie-performanta-Element-de-baza-cu-jgheab-di-800-H-750-Petra-Pavaje.pdf' },
      { label: 'Element de bază cu jgheab De 1040 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2006-Declaratie-performanta-Element-de-baza-cu-jgheab-di-800-H-1000-Petra-Pavaje.pdf' },
      { label: 'Inele — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-800-mm-INELE-Petra-Pavaje.pdf' },
      { label: 'Inel De 1040 / H 250', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2007-Declaratie-performanta-Inel-pentru-camin-di-800-H-250-Petra-Pavaje.pdf' },
      { label: 'Inel De 1040 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2008-Declaratie-performanta-Inel-pentru-camin-di-800-H-500-Petra-Pavaje.pdf' },
      { label: 'Inel De 1040 / H 750', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2009-Declaratie-performanta-Inel-pentru-camin-di-800-H-750-Petra-Pavaje.pdf' },
      { label: 'Inel De 1040 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2010-Declaratie-performanta-Inel-pentru-camin-di-800-H-1000-Petra-Pavaje.pdf' },
      { label: 'Cap tronconic — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-CAP-TRONCONIC-Petra-Pavaje.pdf' },
      { label: 'Inele de aducere la cotă — fișă tehnică', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-INELE-DE-SUPRAINALTARE-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Ce este elementul de bază cu jgheab?', answer: 'Este o variantă a elementului de bază care preia apele pluviale și le direcționează spre ieșirea din interiorul căminului.' },
      { question: 'La ce sunt folosite inelele de aducere la cotă?', answer: 'Se montează pentru ajustarea fină a nivelului capacului căminului la cota finală a carosabilului sau trotuarului.' },
      { question: 'Ce este capul tronconic?', answer: 'Este elementul de trecere de la corpul căminului la gura de acces, reducând diametrul pentru montarea ramei și capacului.' },
    ],
  },

  // ===================== CANALIZARE: TUB FÂNTÂNĂ =====================
  {
    slug: 'tub-fantana',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Tub fântână',
    title: 'Rezervor de apă. Tub fântână',
    shortDescription: 'Soluție pentru infrastructură',
    description:
      'Rezervoarele de apă din beton pot fi folosite și ca tuburi pentru fântână, fiind alegerea potrivită pentru lucrări de infrastructură care necesită un rezervor durabil, rezistent la presiunea solului și la infiltrații.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/tub-fantana.webp',
    gallery: [],
    heroFeatures: ['Ø 1000 mm', 'Beton dens', 'Garanție 2 ani'],
    colors: [],
    technicalFeatures: ['Beton dens, rezistent la infiltrații', 'Utilizabil atât ca rezervor de apă, cât și ca tub de fântână'],
    advantages: ['Durabilitate ridicată pentru lucrări de infrastructură', 'Producție românească certificată'],
    usage: ['Fântâni', 'Rezervoare de apă', 'Infrastructură'],
    variantGroups: [
      {
        name: 'Tub fântână / Rezervor de apă',
        variants: [
          { name: 'Rezervor de apă Di 1000 / H 1000', code: '—', dimensions: 'Di 1000 mm, H 1000 mm, g 70 mm', weightKg: 540 },
          { name: 'Rezervor de apă Di 1000 / H 500', code: '—', dimensions: 'Di 1000 mm, H 500 mm, g 70 mm', weightKg: '—' },
          { name: 'Rezervor de apă Di 800 / H 1000', code: '—', dimensions: 'Di 800 mm, H 1000 mm, g 65 mm', weightKg: '—' },
          { name: 'Rezervor de apă Di 800 / H 500', code: '—', dimensions: 'Di 800 mm, H 500 mm, g 65 mm', weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Rezervor de apă Di 1000 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2035-Declaratie-performanta-Tub-fantana-di-1000-H-1000-g-70-Petra-Pavaje.pdf' },
      { label: 'Rezervor de apă Di 1000 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2037-Declaratie-performanta-Tub-fantana-di-1000-H-500-g-70-Petra-Pavaje.pdf' },
      { label: 'Rezervor de apă Di 800 / H 1000', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2036-Declaratie-performanta-Tub-fantana-di-800-H-1000-g-65-Petra-Pavaje.pdf' },
      { label: 'Rezervor de apă Di 800 / H 500', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2038-Declaratie-performanta-Tub-fantana-di-800-H-500-g-65-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Poate fi folosit rezervorul de apă și ca tub de fântână?', answer: 'Da, este proiectat pentru ambele utilizări — ca rezervor de apă sau ca tub de fântână.' },
    ],
  },

  // ===================== CANALIZARE: TUBURI ȘI TIMPANE =====================
  {
    slug: 'tuburi-si-timpane',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Tuburi și timpane',
    title: 'Tuburi și timpane',
    shortDescription: 'Beton rezistent pentru rețele de canalizare',
    description:
      'Tuburile din beton sunt mult mai rezistente decât orice alt tip de conducte — nu pot fi slăbite de căldură, umiditate, mucegai sau dăunători și nici nu vor rugini. Tuburile cu talpă, cep și buză sunt folosite pentru realizarea rețelelor de canalizare care preiau apele uzate, sub presiune redusă sau prin curgere liberă.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/tuburi-cu-talpa-cu-cep-si-buza-din-beton-simplu-petra-pavaje.webp',
    gallery: [],
    heroFeatures: ['4 diametre', 'Beton simplu', 'Garanție 2 ani'],
    colors: [],
    technicalFeatures: ['Rezistent la căldură, umiditate, mucegai și dăunători', 'Nu ruginește', 'Cep și buză pentru îmbinare etanșă'],
    advantages: ['Durabilitate net superioară altor tipuri de conducte', 'Gamă de 4 diametre pentru orice debit', 'Producție românească certificată'],
    usage: ['Rețele de canalizare', 'Preluare ape uzate'],
    variantGroups: [
      {
        name: 'Tuburi cu talpă, cep și buză',
        variants: [
          { name: 'Tub De 362', code: '—', dimensions: 'De 362 mm, di 300 mm, g 31 mm, L 1000 mm', weightKg: 75 },
          { name: 'Tub De 490', code: '—', dimensions: 'De 490 mm, di 400 mm, g 45 mm, L 1000 mm', weightKg: 150 },
          { name: 'Tub De 596', code: '—', dimensions: 'De 596 mm, di 500 mm, g 48 mm, L 1000 mm', weightKg: 237 },
          { name: 'Tub De 710', code: '—', dimensions: 'De 710 mm, di 600 mm, g 55 mm, L 1000 mm', weightKg: 260 },
        ],
      },
      {
        name: 'Timpane',
        variants: [
          { name: 'Timpan TT30', code: '—', dimensions: 'L 130 mm, g 14 mm, h 100 mm, Dn 30 mm', weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Tub De 362 (di 300 mm)', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2084-Declaratie-performanta-Tub-cu-talpa-di-300-Petra-Pavaje.pdf' },
      { label: 'Tub De 490 (di 400 mm)', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2085-Declaratie-performanta-Tub-cu-talpa-di-400-Petra-Pavaje.pdf' },
      { label: 'Tub De 596 (di 500 mm)', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2086-Declaratie-performanta-Tub-cu-talpa-di-500-Petra-Pavaje.pdf' },
      { label: 'Tub De 710 (di 600 mm)', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2087-Declaratie-performanta-Tub-cu-talpa-di-600-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Ce este un timpan?', answer: 'Timpanul este elementul de capăt al unui tub de canalizare, folosit pentru a închide sau racorda rețeaua într-un punct terminal.' },
    ],
  },

  // ===================== CANALIZARE: INFRASTRUCTURĂ RUTIERĂ =====================
  {
    slug: 'infrastructura-rutiera',
    parent: { slug: 'elemente-de-canalizare', name: 'Elemente de canalizare' },
    name: 'Infrastructură rutieră',
    title: 'Infrastructură rutieră',
    shortDescription: 'Elemente prefabricate din beton',
    description:
      'Petra Pavaje oferă o gamă complexă de elemente prefabricate din beton pentru infrastructură rutieră: de la rigole carosabile și rigole de acostament, la capace carosabile și necarosabile, proiectate și testate pentru a face față rigorilor traficului auto.',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/slider-infrastructura-rutiera-petra-pavaje.webp',
    gallery: [],
    heroFeatures: ['Capace carosabile și necarosabile', 'Beton armat', 'Garanție 2 ani'],
    colors: [],
    technicalFeatures: ['Beton armat pentru rezistență la trafic', 'Variante cu capac fontă', 'Proiectate pentru uz carosabil sau necarosabil'],
    advantages: ['Gamă completă de capace, pentru orice tip de acces', 'Variante întărite cu capac din fontă', 'Producție românească certificată'],
    usage: ['Acces la canalizare', 'Conducte subterane', 'Rețele de scurgere'],
    variantGroups: [
      {
        name: 'Capac necarosabil',
        variants: [
          { name: 'Placă rectangulară necarosabilă 1000×1000', code: '2040', dimensions: '1000×1000×150 mm (beton armat)', weightKg: 250 },
          { name: 'Placă necarosabilă + capac fontă 1000×1000', code: '2042', dimensions: '1000×1000×150 mm (beton armat + capac fontă)', weightKg: 300 },
          { name: 'Placă rectangulară necarosabilă 1200×1200', code: '—', dimensions: '1200×1200×150 mm (beton armat)', weightKg: 400 },
          { name: 'Placă necarosabilă + capac fontă 1200×1200', code: '—', dimensions: '1200×1200×150 mm (beton armat + capac fontă)', weightKg: 450 },
        ],
      },
      {
        name: 'Capac carosabil',
        variants: [
          { name: 'Placă rectangulară carosabilă 1000×1000', code: '2048', dimensions: '1000×1000×200 mm (beton armat)', weightKg: '—' },
          { name: 'Placă carosabilă + capac fontă', code: '2049', dimensions: '1000×1000×200 mm (beton armat + capac fontă)', weightKg: '—' },
          { name: 'Placă carosabilă + capac fontă 5h', code: '2050', dimensions: '1000×1000×200 mm (beton armat + capac fontă 5h)', weightKg: '—' },
          { name: 'Placă carosabilă + capac compozit', code: '2051', dimensions: '1000×1000×200 mm (beton armat + capac compozit)', weightKg: '—' },
          { name: 'Placă carosabilă + capac compozit 5h', code: '2052', dimensions: '1000×1000×200 mm (beton armat + capac compozit 5h)', weightKg: '—' },
        ],
      },
    ],
    documents: [
      { label: 'Placă rectangulară necarosabilă 1000×1000', productCode: '2040', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-necarosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2040-Declaratie-performanta-Capac-necarosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x150-Petra-Pavaje.pdf' },
      { label: 'Placă necarosabilă + capac fontă', productCode: '2042', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-necarosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2042-Declaratie-performanta-Capac-necarosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x150capac-Petra-Pavaje.pdf' },
      { label: 'Placă rectangulară carosabilă', productCode: '2048', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-carosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2048-Declaratie-performanta-Capac-carosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x200-Petra-Pavaje.pdf' },
      { label: 'Placă carosabilă + capac fontă', productCode: '2049', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-carosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2049-Declaratie-performanta-Capac-carosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x200capac-fonta-Petra-Pavaje.pdf' },
      { label: 'Placă carosabilă + capac fontă 5h', productCode: '2050', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-carosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2050-Declaratie-performanta-Capac-carosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x200capac-fonta-5h-Petra-Pavaje.pdf' },
      { label: 'Placă carosabilă + capac compozit', productCode: '2051', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-carosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2051-Declaratie-performanta-Capac-carosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x200capac-compozit-Petra-Pavaje.pdf' },
      { label: 'Placă carosabilă + capac compozit 5h', productCode: '2052', datasheetUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-Elemente-pentru-camine-Capac-carosabil-rectangular-Petra-Pavaje.pdf', declarationUrl: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2052-Declaratie-performanta-Capac-carosabil-rectangular-Rama-rectangulara-din-beton-armat-1200x1200x200capac-comp-5h-Petra-Pavaje.pdf' },
    ],
    faq: [
      { question: 'Ce diferență este între capacul carosabil și cel necarosabil?', answer: 'Capacul carosabil este proiectat și testat pentru a susține trafic auto, în timp ce capacul necarosabil este destinat exclusiv accesului pietonal sau tehnic.' },
      { question: 'Ce este capacul fontă 5h?', answer: 'Este o variantă de capac din fontă cu o clasă de rezistență superioară, notată "5h", recomandată pentru trafic auto intens.' },
    ],
  },
]

export function getElementBySlug(slug: string): ElementCategoryData | undefined {
  return elementCategories.find((c) => c.slug === slug)
}

export function getElementsByParent(parentSlug: string): ElementCategoryData[] {
  return elementCategories.filter((c) => c.parent?.slug === parentSlug)
}
