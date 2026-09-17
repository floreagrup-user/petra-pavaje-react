import type { WoodstoneCategory } from './types'
import { woodstoneTranslationsEn } from './woodstone.en'


export const woodstoneCategories: WoodstoneCategory[] = [
  {
    slug: 'pavaj',
    name: 'Pavaj',
    title: 'Pavaj',
    shortDescription: 'Aspect natural de lemn, durabilitate de piatră',
    description: 'Sistemul de pavaje din portofoliul Lemn Pietrificat include o gamă variată de elemente care reproduc aspectul natural al lemnului. Formele și dimensiunile plăcilor și pavajelor permit numeroase combinații, fiind potrivite pentru amenajarea aleilor, trotuarelor, zonelor de relaxare din jurul caselor și grădinilor, precum și a spațiilor publice. Designul deosebit completează armonios naturalețea spațiului exterior amenajat.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone1-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone2-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone3-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-41_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-40_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-33_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-25_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-23_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-20_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-19_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-16_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-15_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-13_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-10_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone-9_web.avif`,
    ],
    heroFeatures: ['17 variante (plăci, butuci, scânduri, scândură maxi)', 'Multiple culori și finisaje', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Plăci',
        variants: [
          { name: 'Placă 100', code: '880046', dimensions: '100 × 25 × 5 cm', piecesPerMp: 4, weightKg: 27, palletizing: '22/594' },
          { name: 'Placă 75', code: '880047', dimensions: '74,5 × 25 × 5 cm', piecesPerMp: 5.34, weightKg: 20, palletizing: '22/440' },
          { name: 'Placă 50', code: '880048', dimensions: '49,5 × 25 × 5 cm', piecesPerMp: 8, weightKg: 13, palletizing: '44/572' },
        ],
      },
      {
        name: 'Butuci',
        variants: [
          { name: 'Butuc 50', code: '880059', dimensions: '49,5 × 49,5 × 5 cm', piecesPerMp: 8, weightKg: 25, palletizing: '40/1.000' },
          { name: 'Butuc 50×25', code: '880136', dimensions: '49,5 × 24,8 × 5 cm', piecesPerMp: 8, weightKg: 13, palletizing: '44/572' },
          { name: 'Butuc 25', code: '880058', dimensions: '24 × 24 × 5 cm', piecesPerMp: 16, weightKg: 6.5, palletizing: '150/975' },
          { name: 'Butuc rotund 45', code: '880060', dimensions: 'ø45 × 5 cm', weightKg: 13.5, palletizing: '40/540' },
        ],
      },
      {
        name: 'Scânduri',
        variants: [
          { name: 'Scândură 100', code: '880131', dimensions: '100 × 25 × 5 cm', piecesPerMp: 4, weightKg: 27, palletizing: '22/594' },
          { name: 'Scândură 75', code: '880133', dimensions: '75 × 25 × 5 cm', piecesPerMp: 5.34, weightKg: 20, palletizing: '22/440' },
          { name: 'Scândură 50', code: '880134', dimensions: '50 × 25 × 5 cm', piecesPerMp: 8, weightKg: 13, palletizing: '44/572' },
          { name: 'Scândură – Butuc 25', code: '880132', dimensions: '25 × 25 × 5 cm', piecesPerMp: 16, weightKg: 6.5, palletizing: '150/975' },
        ],
      },
      {
        name: 'Scândură Maxi',
        variants: [
          { name: 'Scândură Maxi 200×40', code: '880061', dimensions: '200 × 40 × 7 cm', piecesPerMp: 1.25, weightKg: 121, palletizing: '6/726' },
          { name: 'Scândură Maxi 150×40', code: '880063', dimensions: '150 × 40 × 7 cm', piecesPerMp: 1.67, weightKg: 90.5, palletizing: '6/543' },
          { name: 'Scândură Maxi 100×40', code: '880064', dimensions: '100 × 40 × 7 cm', piecesPerMp: 2.5, weightKg: 60.5, palletizing: '6/363' },
          { name: 'Scândură Maxi 200×75', code: '880073', dimensions: '200 × 75 × 8 cm', piecesPerMp: 0.67, weightKg: 260, palletizing: '3/780' },
          { name: 'Scândură Maxi 150×75', code: '880074', dimensions: '150 × 75 × 8 cm', piecesPerMp: 0.89, weightKg: 195, palletizing: '3/585' },
          { name: 'Scândură Maxi 100×75', code: '880075', dimensions: '100 × 75 × 8 cm', piecesPerMp: 1.33, weightKg: 130, palletizing: '3/390' },
        ],
      },
    ],
    technicalFeatures: [
      'Produs integral din beton',
      'Finisaje deosebite cu noduri și fibre naturale',
      'Rezistență la îngheț și cicluri de îngheț-dezgheț',
      'Impregnate din fabrică cu strat protector',
      'Fante deschise spre exterior pentru drenaj',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate specifică betonului',
      'Durabilitate superioară betonului',
      'Fără necesitate de întreținere',
      'Peste 100 de combinații posibile',
      'Ideal pentru terase și zone de relaxare',
    ],
    usage: ['Alei și Trotuare', 'Terase și Zone de Relaxare', 'Grădini Rezidențiale', 'Spații Publice'],
    faq: [
      { question: 'Ce este pavajul Woodstone Pavaj și din ce este realizat?', answer: 'Este un sistem de pavaje din beton vibropresat care reproduce aspectul autentic al lemnului — noduri, fibre și muchii tocite — combinând textura naturală a lemnului cu durabilitatea betonului.' },
      { question: 'Câte variante de format sunt disponibile?', answer: 'Gama include 17 variante, împărțite în 4 grupe: plăci (3 variante), butuci (4 variante), scânduri (4 variante) și scândură maxi (6 variante), permițând peste 100 de combinații de amenajare.' },
      { question: 'Este rezistent la îngheț?', answer: 'Da. Produsul este impregnat din fabrică cu un strat protector, iar fantele sunt deschise spre exterior pentru a permite expansiunea apei în cicluri de îngheț-dezgheț, fără deteriorarea suprafeței.' },
      { question: 'Unde poate fi folosit pavajul Woodstone?', answer: 'Este recomandat pentru alei și trotuare, terase și zone de relaxare, grădini rezidențiale și spații publice.' },
      { question: 'Există fișă tehnică pentru gama Pavaj Woodstone?', answer: 'Documentația tehnică poate fi solicitată direct de la reprezentanții Petra Pavaje pentru fiecare format din gamă.' },
    ],
  },
  {
    slug: 'palisade-si-borduri',
    name: 'Palisade și Borduri',
    title: 'Palisade și Borduri',
    shortDescription: 'Delimitare elegantă și rezistentă pentru grădină',
    description: 'Gama de palisade și borduri Woodstone oferă soluții complete pentru delimitarea aleilor, gazonului și zonelor plantate. Palisadele grindă și placă se montează vertical, în diverse înălțimi, pentru garduri joase și ziduri de sprijin decorative, în timp ce bordurile și elementele de delimitare gazon marchează clar limitele aleilor și ale peluzelor. Toate piesele păstrează aspectul autentic al lemnului pietrificat.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisade-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/KnelY7z7KOMzqIjGh940OlqeQUs_web-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada-woodstone-13_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada-woodstone-14_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada-woodstone-16_web.avif`,
    ],
    heroFeatures: ['21 variante (18 palisade + delimitare gazon + 2 borduri)', 'Lemn pietrificat masiv', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Palisadă Grindă',
        variants: [
          { name: 'Palisadă grindă 250', code: '880080', dimensions: '24 × 15 × 250 cm', piecesPerMp: 4.16, weightKg: 210, palletizing: '6/1.260' },
          { name: 'Palisadă grindă 150', code: '880072', dimensions: '24 × 15 × 150 cm', piecesPerMp: 4.16, weightKg: 125, palletizing: '9/1.125' },
          { name: 'Palisadă grindă 125', code: '880071', dimensions: '24 × 15 × 125 cm', piecesPerMp: 4.16, weightKg: 104, palletizing: '9/936' },
          { name: 'Palisadă grindă 100', code: '880049', dimensions: '24 × 15 × 100 cm', piecesPerMp: 4.16, weightKg: 84, palletizing: '15/1.260' },
          { name: 'Palisadă grindă 75', code: '880050', dimensions: '24 × 15 × 74,5 cm', piecesPerMp: 4.16, weightKg: 63, palletizing: '15/945' },
          { name: 'Palisadă grindă 50', code: '880051', dimensions: '24 × 15 × 49,5 cm', piecesPerMp: 4.16, weightKg: 41, palletizing: '30/1.230' },
          { name: 'Palisadă grindă 25', code: '880052', dimensions: '24 × 15 × 25 cm', piecesPerMp: 4.16, weightKg: 20, palletizing: '36/720' },
        ],
      },
      {
        name: 'Palisadă Placă',
        variants: [
          { name: 'Palisadă placă 75', code: '880047', dimensions: '25 × 5 × 74,5 cm', piecesPerMp: 4, weightKg: 20, palletizing: '22/440' },
          { name: 'Palisadă placă 50', code: '880048', dimensions: '25 × 5 × 49,5 cm', piecesPerMp: 4, weightKg: 13, palletizing: '44/572' },
          { name: 'Palisadă placă 25', code: '880053', dimensions: '25 × 5 × 24,5 cm', piecesPerMp: 4, weightKg: 6, palletizing: '72/432' },
        ],
      },
      {
        name: 'Palisadă Scândură',
        variants: [
          { name: 'Palisadă scândură 200×40', code: '880061', dimensions: '40 × 7 × 200 cm', piecesPerMp: 2.5, weightKg: 121, palletizing: '6/726' },
          { name: 'Palisadă scândură 150×40', code: '880063', dimensions: '40 × 7 × 150 cm', piecesPerMp: 2.5, weightKg: 90.5, palletizing: '6/543' },
          { name: 'Palisadă scândură 100×40', code: '880064', dimensions: '40 × 7 × 100 cm', piecesPerMp: 2.5, weightKg: 60.5, palletizing: '6/363' },
          { name: 'Palisadă scândură 50×40', code: '880065', dimensions: '40 × 7 × 50 cm', piecesPerMp: 2.5, weightKg: 30, palletizing: '12/360' },
          { name: 'Palisadă scândură 200×75', code: '880073', dimensions: '75 × 8 × 200 cm', piecesPerMp: 1.3, weightKg: 260, palletizing: '3/780' },
          { name: 'Palisadă scândură 150×75', code: '880074', dimensions: '75 × 8 × 150 cm', piecesPerMp: 1.3, weightKg: 195, palletizing: '3/585' },
          { name: 'Palisadă scândură 100×75', code: '880075', dimensions: '75 × 8 × 100 cm', piecesPerMp: 1.3, weightKg: 130, palletizing: '3/390' },
          { name: 'Palisadă scândură 50×75', code: '880076', dimensions: '75 × 8 × 50 cm', piecesPerMp: 1.3, weightKg: 65, palletizing: '6/390' },
        ],
      },
      {
        name: 'Delimitare Gazon',
        variants: [
          { name: 'Delimitare gazon', code: '880057', dimensions: '28 × 12 × 4 cm', piecesPerMp: 4, weightKg: 2.5, palletizing: '300/750' },
        ],
      },
      {
        name: 'Borduri',
        variants: [
          { name: 'Bordură neregulată', code: '880055', dimensions: '80 × 8 × 23-27 cm', piecesPerMp: 1.25, weightKg: 34, palletizing: '24/816' },
          { name: 'Bordură regulată', code: '880056', dimensions: '80 × 8 × 20 cm', piecesPerMp: 1.25, weightKg: 25, palletizing: '30/750' },
        ],
      },
    ],
    technicalFeatures: [
      'Aspect natural de lemn, durabilitate specifică betonului',
      'Finisaje cu textură naturală de lemn învechit',
      'Rezistență la îngheț și cicluri de îngheț-dezgheț',
      'Impregnate din fabrică cu strat protector',
      'Montaj vertical (palisade) sau la sol (borduri)',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate de piatră',
      'Nu necesită întreținere periodică',
      'Ușor de montat și manipulat',
      'Se asortează cu pavajele și gardurile Woodstone',
      'Gamă variată de dimensiuni, de la 25 cm la 250 cm',
    ],
    usage: ['Delimitare Alei și Trotuare', 'Ziduri de Sprijin Decorative', 'Marcare Straturi de Flori', 'Delimitare Gazon și Peluze'],
    faq: [
      { question: 'Ce diferență este între palisada grindă și palisada placă?', answer: 'Palisada grindă (24×15 cm secțiune) este masivă, gândită pentru garduri joase și ziduri de sprijin, în timp ce palisada placă (25×5 cm) este mai subțire, potrivită pentru delimitări ușoare de alei și straturi de flori.' },
      { question: 'Câte variante sunt disponibile în gama Palisade și Borduri?', answer: 'Gama include 21 de variante: 18 palisade (grindă, placă și scândură, în lungimi de la 25 la 250 cm), 1 element de delimitare gazon și 2 tipuri de borduri (neregulată și regulată).' },
      { question: 'Cum se montează palisadele?', answer: 'Palisadele grindă și placă se montează vertical, îngropate parțial în sol, pentru garduri joase sau ziduri de sprijin decorative; bordurile se montează la sol, de-a lungul aleilor sau peluzelor.' },
      { question: 'Unde se folosesc de obicei palisadele și bordurile Woodstone?', answer: 'Sunt recomandate pentru delimitarea aleilor și trotuarelor, ziduri de sprijin decorative, marcarea straturilor de flori și delimitarea gazonului și a peluzelor.' },
    ],
  },
  {
    slug: 'scari',
    name: 'Scări',
    title: 'Scări',
    shortDescription: 'Eleganță și siguranță pentru exteriorul casei tale',
    description: 'Scările din gama Woodstone reprezintă soluția perfectă pentru amenajarea intrărilor, teraselor și grădinilor cu diferențe de nivel. Trepte și plăci-treaptă cu aspect de lemn pietrificat, disponibile în mai multe lungimi și grosimi, oferă o tranziție elegantă și sigură între diferite niveluri ale curții, păstrând aspectul natural al lemnului și rezistența betonului.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/trepti-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scara-woodstone1-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scara-woodstone2-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scari-woodstone-18_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scari-woodstone-17_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scari-woodstone-16_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/scari-woodstone-4_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada-woodstone-15_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada-woodstone-16_web.avif`,
    ],
    heroFeatures: ['12 variante (6 trepte + 6 plăci-treaptă)', 'Lemn pietrificat masiv', 'Suprafață antiderapantă'],
    variantGroups: [
      {
        name: 'Trepte',
        variants: [
          { name: 'Treaptă 250', code: '880080', dimensions: '250 × 24 × 15 cm', weightKg: 210, palletizing: '6/1.260' },
          { name: 'Treaptă 150', code: '880072', dimensions: '150 × 24 × 15 cm', weightKg: 125, palletizing: '9/1.125' },
          { name: 'Treaptă 125', code: '880071', dimensions: '125 × 24 × 15 cm', weightKg: 104, palletizing: '9/936' },
          { name: 'Treaptă 100', code: '880049', dimensions: '100 × 24 × 15 cm', weightKg: 84, palletizing: '15/1.260' },
          { name: 'Treaptă 75', code: '880050', dimensions: '74,5 × 24 × 15 cm', weightKg: 63, palletizing: '15/945' },
          { name: 'Treaptă 50', code: '880051', dimensions: '49,5 × 24 × 15 cm', weightKg: 41, palletizing: '30/1.230' },
        ],
      },
      {
        name: 'Plăci Treaptă',
        variants: [
          { name: 'Placă treaptă 200 (grosime 7cm)', code: '880061', dimensions: '200 × 40 × 7 cm', weightKg: 121, palletizing: '6/726' },
          { name: 'Placă treaptă 150 (grosime 7cm)', code: '880063', dimensions: '150 × 40 × 7 cm', weightKg: 90.5, palletizing: '6/543' },
          { name: 'Placă treaptă 100 (grosime 7cm)', code: '880064', dimensions: '100 × 40 × 7 cm', weightKg: 60.5, palletizing: '6/363' },
          { name: 'Placă treaptă 200 (grosime 8cm)', code: '880073', dimensions: '200 × 75 × 8 cm', weightKg: 260, palletizing: '3/780' },
          { name: 'Placă treaptă 150 (grosime 8cm)', code: '880074', dimensions: '150 × 75 × 8 cm', weightKg: 195, palletizing: '3/585' },
          { name: 'Placă treaptă 100 (grosime 8cm)', code: '880075', dimensions: '100 × 75 × 8 cm', weightKg: 130, palletizing: '3/390' },
        ],
      },
    ],
    technicalFeatures: [
      'Produs integral din beton',
      'Rezistență la îngheț și intemperii',
      'Suprafață cu texturi naturale antiderapante',
      'Impregnate din fabrică cu strat protector',
      'Durabilitate ridicată în timp',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate specifică betonului',
      'Nu necesită întreținere periodică',
      'Suprafață antiderapantă pentru siguranță',
      'Ușor de montat și manipulat',
      'Se asortează cu palisadele și pavajele Woodstone',
    ],
    usage: ['Intrări Case', 'Terase și Platforme', 'Grădini și Curți', 'Spații Comerciale'],
    faq: [
      { question: 'Ce diferență este între trepte și plăci-treaptă?', answer: 'Treptele (250×24×15 cm și mai mici) au o secțiune masivă, dedicată exclusiv treptelor; plăcile-treaptă (grosime 7 sau 8 cm) sunt mai subțiri și pot fi folosite atât ca trepte, cât și ca elemente de pavaj pentru platforme.' },
      { question: 'Câte variante de scări sunt disponibile?', answer: 'Gama include 12 variante: 6 trepte (de la 50 la 250 cm lungime) și 6 plăci-treaptă (grosimi de 7 și 8 cm).' },
      { question: 'Este suprafața scărilor antiderapantă?', answer: 'Da. Suprafața are texturi naturale de lemn care oferă aderență sporită, recomandată pentru intrări, terase și platforme unde siguranța la circulație este importantă.' },
      { question: 'Unde se folosesc scările Woodstone?', answer: 'Sunt potrivite pentru intrări în case, terase și platforme, grădini și curți cu diferențe de nivel, precum și spații comerciale.' },
    ],
  },
  {
    slug: 'garduri',
    name: 'Garduri',
    title: 'Garduri',
    shortDescription: 'Sistem modular: plăci de gard + stâlpi de susținere',
    description: 'Sistemul de garduri cu design Lemn Pietrificat permite construirea de garduri de diferite înălțimi, cu un aspect natural deosebit de frumos. Plăcile de gard sunt disponibile în zece modele diferite, fiecare cu o combinație originală de nuanțe și accente negre distincte, ceea ce face fiecare gard inconfundabil și extrem de durabil. Întregul sistem este completat și închis cu capace de gard. Fiecare stâlp are, pe lângă înălțimea vizibilă (1,6 / 2 / 2,4 m), o porțiune suplimentară de 78 cm destinată îngropării în fundație, pentru stabilitate — de exemplu stâlpul de „2,4 m" are 318 cm lungime fizică totală.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone-vedere-ansamblu-stalpi-intermediari.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone-stalp-colt-placi-gard.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone-stalp-intermediar-placi-gard.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone-copertina-stalp-placa.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gard-woodstone-detaliu-capac-stalp.avif`,
    ],
    heroFeatures: ['13 variante (1 placă + 9 stâlpi + 3 accesorii)', '10 modele de placă, nuanțe cu accente negre', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Plăci de gard',
        variants: [
          { name: 'Placă de gard', code: '880095', dimensions: '189 × 4 × 40 cm', weightKg: 66, palletizing: '15/990' },
        ],
      },
      {
        name: 'Stâlpi de susținere',
        note: '9 variante — 3 poziții × 3 înălțimi (fiecare stâlp are +78 cm lungime fizică suplimentară pentru îngropare în fundație)',
        variants: [
          { name: 'Stâlp intermediar 1,6 m', code: '880102', dimensions: '16 × 16 × 238 cm', weightKg: 111, palletizing: '12/1.332' },
          { name: 'Stâlp de colț 1,6 m', code: '880103', dimensions: '16 × 16 × 238 cm', weightKg: 106, palletizing: '12/1.272' },
          { name: 'Stâlp de capăt 1,6 m', code: '880104', dimensions: '16 × 16 × 238 cm', weightKg: 116, palletizing: '12/1.392' },
          { name: 'Stâlp intermediar 2 m', code: '880096', dimensions: '16 × 16 × 278 cm', weightKg: 137, palletizing: '12/1.644' },
          { name: 'Stâlp de colț 2 m', code: '880097', dimensions: '16 × 16 × 278 cm', weightKg: 129, palletizing: '12/1.548' },
          { name: 'Stâlp de capăt 2 m', code: '880098', dimensions: '16 × 16 × 278 cm', weightKg: 145, palletizing: '12/1.740' },
          { name: 'Stâlp intermediar 2,4 m', code: '880099', dimensions: '16 × 16 × 318 cm', weightKg: 163, palletizing: '12/1.956' },
          { name: 'Stâlp de colț 2,4 m', code: '880100', dimensions: '16 × 16 × 318 cm', weightKg: 152, palletizing: '12/1.824' },
          { name: 'Stâlp de capăt 2,4 m', code: '880101', dimensions: '16 × 16 × 318 cm', weightKg: 174, palletizing: '12/2.088' },
        ],
      },
      {
        name: 'Accesorii',
        variants: [
          { name: 'Inserție în stâlp', code: '880105', dimensions: '4,8 × 3 × 40 cm', weightKg: 3 },
          { name: 'Capac de gard', code: '880106', dimensions: '188,5 × 13 × 5 cm', weightKg: 26 },
          { name: 'Capac de stâlp', code: '880107', dimensions: '24 × 24 × 5 cm', weightKg: 6.5 },
        ],
      },
    ],
    technicalFeatures: [
      'Produs integral din beton',
      'Finisaje cu noduri, muchii tocite, fisuri și crăpături reproduse natural',
      'Impregnate din fabrică cu strat protector',
      'Rezistență la îngheț — fisurile deschise spre exterior permit expansiunea apei',
      'Stâlpi cu 78 cm lungime suplimentară pentru îngropare/fundație',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate specifică betonului, inconfundabil (10 modele de placă)',
      'Durabilitate superioară lemnului natural',
      'Fără necesitate de întreținere periodică',
      'Sistem modular — 3 înălțimi de stâlp și 3 poziții (intermediar/colț/capăt)',
      'Peste 100 de combinații posibile în gama Lemn Pietrificat',
    ],
    usage: ['Împrejmuire Proprietăți', 'Delimitare Grădini', 'Terenuri Denivelate', 'Zone Rezidențiale'],
    faq: [
      { question: 'De ce lungimea fizică a stâlpului este mai mare decât înălțimea gardului?', answer: 'Fiecare stâlp are, pe lângă înălțimea vizibilă (1,6 / 2 / 2,4 m), o porțiune suplimentară de 78 cm destinată îngropării în fundație, pentru stabilitate — de exemplu stâlpul de „2,4 m" are 318 cm lungime fizică totală.' },
      { question: 'Câte modele de placă de gard sunt disponibile?', answer: 'Plăcile de gard sunt disponibile în 10 modele diferite, fiecare cu o combinație originală de nuanțe și accente negre, făcând fiecare gard inconfundabil.' },
      { question: 'Ce tipuri de stâlpi există și în ce înălțimi?', answer: 'Sistemul are 3 poziții de stâlp (intermediar, de colț, de capăt) disponibile în 3 înălțimi nominale (1,6 m, 2 m și 2,4 m) — în total 9 variante de stâlpi.' },
      { question: 'Ce accesorii completează sistemul de garduri?', answer: 'Sistemul se completează cu inserție în stâlp, capac de gard și capac de stâlp, pentru o închidere estetică și protejarea muchiilor superioare.' },
    ],
  },
  {
    slug: 'banci-si-mese',
    name: 'Bănci și Mese',
    title: 'Bănci și Mese',
    shortDescription: 'Confort și robustețe din lemn pietrificat masiv',
    description: 'Gama de bănci și mese Woodstone este realizată din lemn pietrificat masiv, în două variante constructive: bănci scândură, cu blat așezat pe picioare masive, și bănci grindă, dintr-o singură piesă compactă. Mesele asortate completează amenajarea, păstrând aceeași textură naturală, plină de fibră și noduri, specifică lemnului pietrificat.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banca-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banca-woodstone1-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banca-woodstone2-scaled.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banci-mese-woodstone-11_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banci-mese-woodstone-9_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banci-mese-woodstone-6_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/banci-mese-woodstone-4_web.avif`,
    ],
    heroFeatures: ['10 variante (3 bănci scândură + 4 bănci grindă + 3 mese)', 'Lemn pietrificat masiv', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Bănci Scândură',
        variants: [
          { name: 'Bancă scândură 200', code: '880081', dimensions: '200 × 40 × 43 cm', weightKg: 220, palletizing: '2/440' },
          { name: 'Bancă scândură 150', code: '880082', dimensions: '150 × 40 × 43 cm', weightKg: 190, palletizing: '2/380' },
          { name: 'Bancă scândură 100', code: '880083', dimensions: '100 × 40 × 43 cm', weightKg: 160, palletizing: '2/320' },
        ],
      },
      {
        name: 'Bănci Grindă',
        variants: [
          { name: 'Bancă grindă 250', code: '880084', dimensions: '250 × 50 × 45 cm', weightKg: 584, palletizing: '1/584' },
          { name: 'Bancă grindă 150', code: '880140', dimensions: '150 × 50 × 45 cm', weightKg: 414, palletizing: '1/414' },
          { name: 'Bancă grindă 125', code: '880139', dimensions: '125 × 50 × 45 cm', weightKg: 372, palletizing: '1/372' },
          { name: 'Bancă grindă 100', code: '880085', dimensions: '100 × 50 × 45 cm', weightKg: 332, palletizing: '1/332' },
        ],
      },
      {
        name: 'Mese',
        variants: [
          { name: 'Masă 200', code: '880086', dimensions: '200 × 75 × 78 cm', weightKg: 420, palletizing: '1/420' },
          { name: 'Masă 150', code: '880087', dimensions: '150 × 75 × 78 cm', weightKg: 360, palletizing: '1/360' },
          { name: 'Masă 100', code: '880088', dimensions: '100 × 75 × 78 cm', weightKg: 270, palletizing: '1/270' },
        ],
      },
    ],
    technicalFeatures: [
      'Lemn pietrificat masiv, tratat industrial',
      'Finisaje cu textură naturală de lemn învechit',
      'Rezistență la îngheț și cicluri de îngheț-dezgheț',
      'Impregnate din fabrică cu strat protector',
      'Construcție stabilă, fără elemente metalice vizibile',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate de piatră',
      'Nu necesită întreținere periodică',
      'Confortabile pentru utilizare îndelungată în exterior',
      'Se asortează cu pavajele și gardurile Woodstone',
      'Disponibile în variante de bancă și masă asortate',
    ],
    usage: ['Grădini Private', 'Terase și Curți', 'Parcuri și Spații Verzi', 'Zone de Relaxare'],
    faq: [
      { question: 'Ce diferență este între băncile scândură și băncile grindă?', answer: 'Băncile scândură au blatul așezat pe picioare masive separate, în timp ce băncile grindă sunt dintr-o singură piesă compactă, mai robustă și mai grea.' },
      { question: 'Câte variante de bănci și mese sunt disponibile?', answer: 'Gama include 10 variante: 3 bănci scândură, 4 bănci grindă și 3 mese, în lungimi de la 100 la 250 cm.' },
      { question: 'Sunt mesele asortate cu băncile?', answer: 'Da. Mesele păstrează aceeași textură naturală de lemn pietrificat și aceleași lungimi (100, 150 și 200/250 cm), pentru un ansamblu vizual unitar.' },
      { question: 'Necesită întreținere periodică?', answer: 'Nu. Lemnul pietrificat este tratat industrial și impregnat din fabrică cu un strat protector, fără a necesita vopsire sau tratamente ulterioare.' },
    ],
  },
  {
    slug: 'jardiniere-inaltate',
    name: 'Jardiniere Înălțate',
    title: 'Jardiniere Înălțate',
    shortDescription: 'Eleganță și funcționalitate pentru grădina ta',
    description: 'Jardinierele înălțate din gama Woodstone sunt soluția perfectă pentru amenajarea grădinilor, teraselor și balcoanelor. Cu aspectul natural al lemnului pietrificat și rezistența betonului, aceste jardiniere oferă un spațiu ideal pentru cultivarea florilor, plantelor aromatice și legumelor, aducând un plus de verdeață oricărui spațiu exterior. Seturile de prelungire permit extinderea jardinierelor existente, iar gama Kompakt, nouă în 2026, oferă un format mai compact.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/jardiniere-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/jardiniere-woodstone-1_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/jardiniere-woodstone-4_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/alte-elemente-woodstone-6_web.avif`,
    ],
    heroFeatures: ['10 variante (4 jardiniere + 2 seturi prelungire + 4 Kompakt)', 'Lemn pietrificat masiv', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Jardinieră Înălțată',
        variants: [
          { name: 'Jardinieră înălțată 206×112×40', code: '880089', dimensions: '206 × 112 × 40 cm', weightKg: 263, palletizing: '1/263' },
          { name: 'Jardinieră înălțată 206×112×80', code: '880090', dimensions: '206 × 112 × 80 cm', weightKg: 526, palletizing: '1/526' },
          { name: 'Jardinieră înălțată 112×112×40', code: '880091', dimensions: '112 × 112 × 40 cm', weightKg: 197, palletizing: '1/197' },
          { name: 'Jardinieră înălțată 112×112×80', code: '880092', dimensions: '112 × 112 × 80 cm', weightKg: 394, palletizing: '1/394' },
        ],
      },
      {
        name: 'Set Prelungire',
        variants: [
          { name: 'Set prelungire 40', code: '880093', dimensions: '200 × 112 × 40 cm', weightKg: 167, palletizing: '1/167' },
          { name: 'Set prelungire 80', code: '880094', dimensions: '200 × 112 × 80 cm', weightKg: 334, palletizing: '1/334' },
        ],
      },
      {
        name: 'Jardinieră Înălțată Kompakt',
        note: 'NOU 2026',
        variants: [
          { name: 'Jardinieră înălțată Kompakt 200×100×45', code: '880141', dimensions: '200 × 100 × 45 cm', weightKg: 292, palletizing: '1/292', badge: 'NOU 2026' },
          { name: 'Jardinieră înălțată Kompakt 200×100×90', code: '880142', dimensions: '200 × 100 × 90 cm', weightKg: 584, palletizing: '1/584', badge: 'NOU 2026' },
          { name: 'Jardinieră înălțată Kompakt 100×100×45', code: '880143', dimensions: '100 × 100 × 45 cm', weightKg: 192, palletizing: '1/192', badge: 'NOU 2026' },
          { name: 'Jardinieră înălțată Kompakt 100×100×90', code: '880144', dimensions: '100 × 100 × 90 cm', weightKg: 384, palletizing: '1/384', badge: 'NOU 2026' },
        ],
      },
    ],
    technicalFeatures: [
      'Produs integral din beton',
      'Rezistență la îngheț și intemperii',
      'Suprafață cu texturi naturale',
      'Impregnate din fabrică cu strat protector',
      'Durabilitate ridicată în timp',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate specifică betonului',
      'Nu necesită întreținere periodică',
      'Ideal pentru cultivarea plantelor',
      'Înălțime ergonomică pentru lucru',
      'Extensibile cu seturile de prelungire',
    ],
    usage: ['Grădini și Curți', 'Terase și Balcoane', 'Zone de Accent', 'Grădini de Legume'],
    faq: [
      { question: 'Ce este gama Kompakt și cu ce se diferențiază?', answer: 'Kompakt este o gamă nouă în 2026, cu 4 variante într-un format mai compact (200×100 sau 100×100 cm) față de jardinierele standard, ideală pentru spații mai mici — terase și balcoane.' },
      { question: 'Se pot extinde jardinierele existente?', answer: 'Da. Seturile de prelungire (40 și 80 cm înălțime) permit mărirea unei jardiniere existente fără a cumpăra o unitate complet nouă.' },
      { question: 'Câte variante de jardiniere sunt disponibile?', answer: 'Gama include 10 variante: 4 jardiniere înălțate standard, 2 seturi de prelungire și 4 variante Kompakt (noi în 2026).' },
      { question: 'Este înălțimea potrivită pentru grădinărit fără efort?', answer: 'Da. Înălțimile disponibile (40, 80 și 90 cm) sunt gândite ergonomic, pentru a evita aplecarea la lucrul cu plantele.' },
    ],
  },
  {
    slug: 'elemente-lemn-pietrificat',
    name: 'Alte Elemente',
    title: 'Alte Elemente',
    shortDescription: 'Piese decorative și funcționale pentru amenajări complete',
    description: 'Gama Alte Elemente Woodstone completează amenajările exterioare cu piese practice și decorative din lemn pietrificat: ghivece robuste pentru plantare, margini de piscină pentru delimitarea elegantă a bazinelor, plăci și rigole pentru scurgerea apei, precum și coșuri de gunoi rezistente la intemperii. Toate păstrează aspectul autentic al lemnului cu durabilitatea betonului.',
    image: `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/alte-elemente-woodstone_web.avif`,
    gallery: [
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/woodstoone-Medium.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/alte-elemente-woodstone-7_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/alte-elemente-woodstone-6_web.avif`,
      `https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/alte-elemente-woodstone-4_web.avif`,
    ],
    heroFeatures: ['9 variante (3 ghivece + 3 margini piscină + 3 diverse)', 'Lemn pietrificat masiv', 'Rezistent la îngheț și intemperii'],
    variantGroups: [
      {
        name: 'Ghivece',
        variants: [
          { name: 'Ghiveci I', code: '880077', dimensions: '45 × 45 × 80 cm', weightKg: 130 },
          { name: 'Ghiveci II', code: '880078', dimensions: '90 × 45 × 40 cm', weightKg: 130 },
          { name: 'Ghiveci', code: '880079', dimensions: '78 × 28 × 18,5 cm', weightKg: 43 },
        ],
      },
      {
        name: 'Margini de Piscină',
        variants: [
          { name: 'Margine de piscină dreaptă tip L', code: '880068', dimensions: '75 × 35 × 4,5 cm', weightKg: 31 },
          { name: 'Margine de piscină colț interior', code: '880070', dimensions: '50,5 × 50,5 × 4,5 cm', weightKg: 25 },
          { name: 'Margine de piscină colț exterior', code: '880069', dimensions: '50,5 × 50,5 × 4,5 cm', weightKg: 24 },
        ],
      },
      {
        name: 'Elemente Diverse',
        variants: [
          { name: 'Placă', code: '880128', dimensions: '75 × 20 × 2 cm', weightKg: 35 },
          { name: 'Rigolă', code: '880054', dimensions: '80 × 24 × 8 cm', weightKg: 26, palletizing: '30/780' },
          { name: 'Coș de gunoi (cu inserție galvanizată)', code: '880156', dimensions: '45 × 45 × 80 cm', weightKg: 135 },
        ],
      },
    ],
    technicalFeatures: [
      'Produs integral din beton',
      'Rezistență la îngheț și intemperii',
      'Suprafață cu texturi naturale autentice',
      'Impregnate din fabrică cu strat protector',
      'Durabilitate ridicată în timp',
    ],
    advantages: [
      'Aspect natural de lemn, durabilitate de piatră',
      'Nu necesită întreținere periodică',
      'Piese funcționale pentru amenajări complete',
      'Se asortează cu restul gamei Woodstone',
      'Rezistente la umiditate constantă (margini de piscină)',
    ],
    usage: ['Grădini și Curți', 'Piscine și Zone de Agrement', 'Spații Publice', 'Amenajări Complete'],
    faq: [
      { question: 'Ce produse include gama Alte Elemente?', answer: 'Gama include 9 variante: 3 modele de ghivece, 3 tipuri de margini de piscină (dreaptă, colț interior, colț exterior) și 3 elemente diverse — placă, rigolă și coș de gunoi cu inserție galvanizată.' },
      { question: 'Rezistă marginile de piscină la umiditate constantă?', answer: 'Da. Sunt fabricate din beton impregnat cu strat protector, rezistent la contactul continuu cu apa și la ciclurile de îngheț-dezgheț specifice zonelor de piscină.' },
      { question: 'La ce se folosește rigola din gamă?', answer: 'Rigola (80×24×8 cm) este destinată scurgerii apei, completând amenajările de pavaj Woodstone în zonele unde este necesară drenarea suprafeței.' },
      { question: 'Se asortează aceste elemente cu restul gamei Woodstone?', answer: 'Da. Toate piesele păstrează aceeași textură de lemn pietrificat ca pavajele, palisadele și gardurile Woodstone, pentru un aspect unitar al amenajării.' },
    ],
  },
]

export function getWoodstoneCategoryBySlug(slug: string): WoodstoneCategory | undefined {
  return woodstoneCategories.find(c => c.slug === slug)
}

const BADGE_EN: Record<string, string> = {
  'NOU 2026': 'NEW 2026',
}

// Overlays the English translation (when one exists) onto a RO Woodstone
// category for rendering on /en pages. Structural/regulatory data (image,
// gallery, variant codes/dimensions/weights/palletizing) is intentionally
// never translated -- only names, descriptions and the free-text fields in
// woodstone.en.ts, matching the localizeProduct() pattern in products.ts.
export function localizeWoodstoneCategory(category: WoodstoneCategory, lang: 'ro' | 'en'): WoodstoneCategory {
  if (lang !== 'en') return category
  const t = woodstoneTranslationsEn[category.slug]
  if (!t) return category
  return {
    ...category,
    name: t.name,
    title: t.title,
    shortDescription: t.shortDescription,
    description: t.description,
    heroFeatures: t.heroFeatures,
    technicalFeatures: t.technicalFeatures,
    advantages: t.advantages,
    usage: t.usage,
    faq: t.faq ?? category.faq,
    variantGroups: category.variantGroups.map((group, gi) => {
      const tg = t.variantGroups[gi]
      return {
        ...group,
        name: tg?.name ?? group.name,
        note: tg?.note ?? group.note,
        variants: group.variants.map((v, vi) => ({
          ...v,
          name: tg?.variantNames[vi] ?? v.name,
          badge: v.badge ? BADGE_EN[v.badge] ?? v.badge : v.badge,
        })),
      }
    }),
  }
}
