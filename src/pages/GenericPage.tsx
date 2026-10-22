import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { LEGAL_GUARANTEE_URL_RO, LegalGuaranteeNotice } from '@/components/LegalGuaranteeNotice'

const contentMap: Record<string, { title: string; sections: { heading: string; body: string; devOnly?: boolean; legalGuaranteeNotice?: boolean }[]; cta?: boolean }> = {
  'company': {
    title: 'Compania',
    sections: [
      {
        heading: 'Florea Grup',
        body: 'Florea Grup este o companie antreprenorială românească, fondată în anul 1996. De la o afacere mică, compania a crescut continuu, devenind unul dintre cei mai importanți jucători din industria construcțiilor din Transilvania. Cu peste 600 de angajați și activități în construcții, materiale de construcții, distribuție carburanți, servicii de taxi și turism, Florea Grup reprezintă un exemplu de succes antreprenorial românesc.',
      },
      {
        heading: 'Valorile Noastre',
        body: 'Respectul față de clienți și angajați, profesionalismul și responsabilitatea sunt pilonii pe care compania s-a dezvoltat. Echipa noastră este formată din oameni implicați, harnici și ghidați de valori comune.',
      },
    ],
    cta: true,
  },
  'garantie': {
    title: 'Garanție',
    sections: [
      {
        heading: '5 Ani de Garanție',
        body: 'Pavajele Premium și Standard, Woodstone, bordurile, rigolele și gardurile Petra Pavaje beneficiază de o garanție de 5 ani, conform standardelor europene de calitate. Garanția acoperă defectele de fabricație și asigură durabilitatea produselor noastre în timp.',
      },
      {
        heading: 'Certificări',
        body: 'Produsele noastre sunt însoțite de certificări CE și ISO, confirmând conformitatea cu standardele europene de calitate.',
      },
    ],
    cta: true,
  },
  'cariera': {
    title: 'Carieră',
    sections: [
      {
        heading: 'Alătură-te Echipei Noastre',
        body: 'Florea Grup este o poveste despre antreprenoriat, curaj și perseverență. Cu peste 600 de angajați, suntem mereu în căutarea oamenilor talentați care doresc să crească alături de noi.',
      },
      {
        heading: 'De ce să alegi Petra Pavaje?',
        body: 'Oferim un mediu de lucru profesionist, oportunități de dezvoltare, stabilitate și beneficii competitive. Fiecare angajat contează și contribuie la succesul companiei.',
      },
    ],
    cta: true,
  },
  'faq': {
    title: 'Întrebări Frecvente',
    sections: [
      {
        heading: 'Ce tipuri de pavaje oferă Petra Pavaje?',
        body: 'Oferim pavaje premium și standard, în multiple dimensiuni, culori și texturi. De la pavele decorative premium la soluții robuste pentru trafic intens.',
      },
      {
        heading: 'Care este termenul de livrare?',
        body: 'Termenul de livrare variază în funcție de produs și cantitate. Contactează reprezentantul din zona ta pentru o estimare exactă.',
      },
      {
        heading: 'Oferiți servicii de montaj?',
        body: 'Da, colaborăm cu montatori autorizați în toată țara. Te putem pune în legătură cu parteneri din zona ta.',
      },
      {
        heading: 'Care este garanția produselor?',
        body: 'Pavajele Premium și Standard, Woodstone, bordurile, rigolele și gardurile Petra Pavaje beneficiază de o garanție de 5 ani.',
      },
    ],
    cta: true,
  },
  'cookie-uri': {
    title: 'Politica de Cookie-uri',
    sections: [
      {
        heading: 'Ce sunt cookie-urile',
        body: 'Un cookie este un fișier de mici dimensiuni, trimis împreună cu paginile acestui site și stocat de browserul tău. Informațiile stocate pot fi citite la o vizită ulterioară, de acest site sau de un terț relevant. Site-ul folosește și stocare locală similară (localStorage) pentru a reține alegerea ta privind cookie-urile.',
      },
      {
        heading: 'Cookie-uri necesare',
        body: 'Aceste cookie-uri asigură funcționarea de bază a site-ului — de exemplu, rețin alegerea ta din bannerul de cookie-uri, astfel încât să nu ți-o cerem la fiecare vizită. Le plasăm fără a-ți cere consimțământul, fiind strict necesare pentru funcționare.',
      },
      {
        heading: 'Cookie-uri de analiză și publicitate',
        body: 'La data actualizării acestei politici, site-ul nu plasează cookie-uri de analiză (ex. Google Analytics) sau de publicitate (ex. Google Ads) decât dacă alegi explicit să le accepți din bannerul de cookie-uri sau din „Setări cookie-uri" din subsolul paginii. Dacă vom activa astfel de instrumente în viitor, ele vor porni doar după consimțământul tău, conform Regulamentului General privind Protecția Datelor (GDPR).',
      },
      {
        heading: 'Cum îți administrezi alegerea',
        body: 'Poți accepta, refuza sau ajusta oricând categoriile de cookie-uri din linkul „Setări cookie-uri" aflat în subsolul fiecărei pagini. De asemenea, poți șterge cookie-urile deja stocate din setările browserului tău — la vizita următoare îți vom cere din nou consimțământul.',
      },
      {
        heading: 'Drepturile tale',
        body: 'Conform GDPR, ai dreptul de acces, rectificare, ștergere și portabilitate a datelor tale personale, precum și dreptul de a te opune prelucrării sau de a-ți retrage oricând consimțământul. Pentru exercitarea acestor drepturi sau nelămuriri legate de această politică, ne poți contacta la contact@petrapavaje.ro sau la adresa Petra Pavaje, Str. Pietrari nr. 20, Alba Iulia, România. Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).',
      },
    ],
    cta: false,
  },
  'confidentialitate': {
    title: 'Politica de Confidențialitate',
    sections: [
      {
        heading: 'Cine prelucrează datele',
        body: 'Operatorul datelor este FLOREA GRUP S.R.L., cod fiscal RO8273278, înregistrată la Registrul Comerțului sub nr. J01/55/1996, care produce și comercializează pavajele Petra Pavaje. Adresa de corespondență: Str. Pietrari nr. 20, Alba Iulia, România. Email: contact@petrapavaje.ro. Pentru orice întrebare despre datele tale sau pentru exercitarea drepturilor de mai jos, ne poți scrie la această adresă. Prelucrăm datele conform Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018.',
      },
      {
        heading: 'Formularul de contact și cererile de ofertă',
        body: '• Ce date: numele, adresa de email, telefonul (opțional), județul ales și mesajul tău.\n• De ce: ca să-ți răspundem la întrebare sau să-ți pregătim oferta cerută. Temeiul este efectuarea demersurilor pe care le ceri înainte de încheierea unui contract (art. 6 alin. 1 lit. b GDPR) și, pentru întrebările generale, interesul nostru legitim de a răspunde celor care ne scriu (art. 6 alin. 1 lit. f GDPR).\n• Cine le primește: mesajul este trimis prin email către Petra Pavaje și către reprezentantul de vânzări al FLOREA GRUP S.R.L. pentru județul ales. Site-ul nu salvează mesajul într-o bază de date; acesta există doar în căsuțele de email ale echipei noastre. Trimiterea se face printr-un furnizor de servicii de email cu servere în Uniunea Europeană.\n• Cât timp: păstrăm corespondența cel mult 3 ani de la ultimul mesaj schimbat. Dacă încheiem un contract, documentele aferente se păstrează pe durata prevăzută de legislația financiar-contabilă.',
      },
      {
        heading: 'Formularul de carieră',
        body: '• Ce date: numele, adresa de email, telefonul, postul dorit și mesajul tău.\n• De ce: ca să analizăm candidatura și să te contactăm pentru recrutare. Temeiul este efectuarea demersurilor pe care le ceri înainte de încheierea unui contract de muncă (art. 6 alin. 1 lit. b GDPR).\n• Cine le primește: mesajul este trimis prin email doar către departamentul de resurse umane al FLOREA GRUP S.R.L. (cariera@petrapavaje.ro) și nu este salvat în baza de date a site-ului.\n• Cât timp: cel mult 6 luni de la încheierea procesului de recrutare pentru care ai aplicat. Dacă vrei să te luăm în considerare și pentru alte posturi, ne poți spune asta în mesaj, iar candidatura va fi păstrată cel mult 2 ani.',
      },
      {
        heading: 'Newsletterul',
        body: '• Ce date: adresa de email, data abonării, locul din site de unde te-ai abonat și adresa IP de la momentul abonării (ca dovadă a abonării). Platforma de trimitere înregistrează și dacă deschizi mesajele și dacă accesezi linkurile din ele.\n• De ce: ca să-ți trimitem noutăți despre produse și oferte Petra Pavaje. Temeiul este consimțământul tău (art. 6 alin. 1 lit. a GDPR și Legea nr. 506/2004), dat prin abonare.\n• Cine le primește: newsletterul este trimis prin platforma Mailchimp (Intuit Inc., SUA), care acționează ca persoană împuternicită. Datele pot fi prelucrate în afara Spațiului Economic European, în baza Cadrului UE-SUA privind protecția datelor sau a clauzelor contractuale standard (art. 45 și 46 GDPR). O copie a adresei este păstrată și în baza de date a site-ului, găzduită de un furnizor de servicii cloud, și este accesibilă doar echipei de marketing a FLOREA GRUP S.R.L.\n• Cât timp: până te dezabonezi. Fiecare newsletter conține un link de dezabonare; te poți dezabona și scriindu-ne la contact@petrapavaje.ro. Pagina deschisă de link îți confirmă imediat dezabonarea și nu mai primești newsletterul. Adresa este scoasă din baza de date a site-ului și rămâne în evidența dezabonărilor 30 de zile, apoi o ștergem; păstrăm doar o amprentă criptată și data dezabonării, ca dovadă. Nu transmitem adresa ta altor firme.',
      },
      {
        heading: 'Protecția formularelor',
        body: 'Formularele de pe site sunt protejate împotriva spamului și a abuzurilor printr-o verificare automată, care analizează pentru câteva momente date tehnice ale browserului și adresa IP. Verificarea nu folosește aceste date pentru publicitate. Temeiul este interesul nostru legitim de a proteja site-ul (art. 6 alin. 1 lit. f GDPR). Pentru cookie-urile site-ului, vezi Politica de cookie-uri.',
      },
      {
        // Hidden on the live site until the visualizer launches.
        devOnly: true,
        heading: 'Vizualizatorul de pavaje AI: ce date folosim',
        body: '• Fotografia pe care o încarci, cu zona de pavat acoperită. Fotografia originală nu părăsește browserul tău.\n• O amprentă criptată (hash SHA-256 cu cheie secretă) a adresei IP, pentru limitele zilnice și pentru protecția împotriva abuzurilor.\n• Dacă îți confirmi emailul: o amprentă criptată a adresei de email și forma ei mascată (de exemplu a***@exemplu.ro). Adresa completă este folosită doar pentru trimiterea codului de confirmare și nu este salvată în baza noastră de date.\n• Dovada acordului tău: data, versiunea textului acceptat și amprenta criptată de mai sus.\n• Un cookie strict necesar (pv_viz), care păstrează confirmarea emailului timp de 30 de zile.',
      },
      {
        // Hidden on the live site until the visualizer launches.
        devOnly: true,
        heading: 'Vizualizatorul de pavaje AI: scop și temei legal',
        body: '• Generarea imaginii din fotografia ta: consimțământul tău (art. 6 alin. 1 lit. a GDPR), dat înainte de prima imagine.\n• Trimiterea codului de confirmare și evidența celor 3 imagini pe zi pentru adresa confirmată: consimțământul tău (art. 6 alin. 1 lit. a GDPR).\n• Limitele pe adresă IP și limita totală de 200 de imagini pe zi: interesul nostru legitim de a preveni abuzurile și costurile excesive (art. 6 alin. 1 lit. f GDPR).\n• Păstrarea dovezii consimțământului: obligația de a putea demonstra consimțământul (art. 7 alin. 1 GDPR).\nNu luăm decizii automate cu efecte juridice asupra ta și nu folosim datele pentru publicitate sau profilare. Serviciul este destinat persoanelor de cel puțin 16 ani.',
      },
      {
        // Hidden on the live site until the visualizer launches.
        devOnly: true,
        heading: 'Vizualizatorul de pavaje AI: cui transmitem datele',
        body: '• Fotografia cu zona acoperită este transmisă unui furnizor extern de servicii de inteligență artificială, care acționează ca persoană împuternicită și o folosește doar pentru a genera imaginea. Furnizorul poate prelucra datele în afara Spațiului Economic European; transferul se face în baza unei decizii de adecvare a Comisiei Europene sau a clauzelor contractuale standard (art. 45 și 46 GDPR).\n• Codul de confirmare este trimis printr-un furnizor de servicii de email cu servere în Uniunea Europeană.\n• Site-ul și baza de date sunt găzduite de un furnizor de servicii cloud, cu garanțiile prevăzute de GDPR.\nNu vindem și nu închiriem datele tale.',
      },
      {
        // Hidden on the live site until the visualizer launches.
        devOnly: true,
        heading: 'Vizualizatorul de pavaje AI: cât timp păstrăm datele',
        body: '• Fotografia: nu o păstrăm. Există doar în memorie, pe durata generării (de obicei 10-30 de secunde).\n• Imaginea generată: rămâne doar în browserul tău; nu o păstrăm.\n• Contoarele zilnice (amprente IP și email): se șterg automat după 2 zile.\n• Codul de confirmare: 15 minute; se șterge imediat ce este folosit.\n• Confirmarea emailului (sesiunea): 30 de zile sau până apeși „Ieși și șterge datele mele".\n• Dovada consimțământului: 3 ani de la acord sau de la retragerea lui, termenul general de prescripție (art. 2517 Cod civil).',
      },
      {
        // Hidden on the live site until the visualizer launches.
        devOnly: true,
        heading: 'Vizualizatorul de pavaje AI: imaginea generată',
        body: 'Imaginea este creată automat cu inteligență artificială și este orientativă: modelul, culoarea și dimensiunile reale ale pavajului pot diferi, iar obiectele din zona marcată sunt redesenate. Imaginea descărcată poartă mențiunea că este generată cu AI, conform Regulamentului (UE) 2024/1689 privind inteligența artificială. Te rugăm să nu încarci fotografii în care se văd persoane, numere de înmatriculare sau documente.',
      },
      {
        heading: 'Drepturile tale',
        body: 'Ai dreptul de acces, rectificare, ștergere, restricționare a prelucrării și portabilitate a datelor, dreptul de a te opune prelucrării bazate pe interesul legitim și dreptul de a-ți retrage oricând consimțământul, fără a afecta legalitatea prelucrării de până atunci. Pentru celelalte drepturi, scrie-ne la contact@petrapavaje.ro; răspundem în cel mult o lună. Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), www.dataprotection.ro.',
      },
    ],
    cta: false,
  },
  'termeni': {
    title: 'Termeni și Condiții',
    sections: [
      {
        heading: 'Despre acest site',
        body: 'Site-ul petrapavaje.ro este administrat de FLOREA GRUP S.R.L., cod fiscal RO8273278, înregistrată la Registrul Comerțului sub nr. J01/55/1996, cu adresa de corespondență Str. Pietrari nr. 20, Alba Iulia, România, email contact@petrapavaje.ro. Site-ul prezintă produsele Petra Pavaje și nu vinde online: comenzile se fac pe baza unei oferte, prin reprezentanții noștri de vânzări.',
      },
      {
        heading: 'Garanția comercială de 5 ani',
        body: 'Oferim o garanție comercială de 5 ani pentru:\n• Pavaje Premium\n• Pavaje Standard\n• Woodstone\n• Borduri\n• Rigole\n• Garduri\nGaranția acoperă defectele de fabricație, în condițiile din certificatul de garanție care însoțește produsele. Pentru aceste produse, eticheta europeană GARAN este afișată în tabelul cu dimensiuni al fiecărui produs.\nBolțarii, jardinierele, palisada, treptele, blocul de zid și elementele de canalizare nu au garanție comercială de 5 ani.',
      },
      {
        heading: 'Garanția legală de conformitate',
        body: 'Pentru toate produsele, consumatorii beneficiază de garanția legală de conformitate de cel puțin doi ani, conform Ordonanței de urgență a Guvernului nr. 140/2021. Vânzătorul răspunde pentru orice neconformitate existentă la livrare și constatată în această perioadă și trebuie să ofere repararea sau înlocuirea gratuită a produsului, iar în unele cazuri reducerea prețului sau rambursarea integrală. Garanția legală se aplică independent de garanția comercială de 5 ani și nu este limitată de aceasta.\nDacă un produs primit nu este conform, scrie-ne cât mai curând la contact@petrapavaje.ro și trimite o dovadă a achiziției, de exemplu factura.',
        legalGuaranteeNotice: true,
      },
    ],
    cta: false,
  },
  'intretinere': {
    title: 'Ghid de Întreținere',
    sections: [
      {
        heading: 'Curățare Periodică',
        body: 'Pentru a menține aspectul pavajelor, recomandăm curățarea periodică cu apă și detergent neutru. Evitați utilizarea acizilor sau a produselor abrazive.',
      },
      {
        heading: 'Protecție în Sezonul Rece',
        body: 'Pentru curățarea zăpezii, utilizați unelte cu margini de cauciuc. Evitați sarea în exces, care poate afecta culoarea pavajelor.',
      },
      {
        heading: 'Tratamente Periodice',
        body: 'Aplicarea unui tratament hidrofob la 2-3 ani poate prelungi semnificativ viața și aspectul pavajelor.',
      },
    ],
    cta: false,
  },
}

export function GenericPage({ title, contentKey }: { title: string; contentKey: string }) {
  const content = contentMap[contentKey]

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
            <h1 className="heading-h1 mb-4">{title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-4xl">
          {content ? (
            <div className="space-y-12">
              {content.sections.filter((section) => !section.devOnly || import.meta.env.DEV).map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-charcoal-900 mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-body-lg text-charcoal-600 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                  {section.legalGuaranteeNotice && (
                    <div className="mt-4 flex flex-col gap-2 text-body-lg">
                      <LegalGuaranteeNotice
                        isEnglish={false}
                        className="self-start font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
                      />
                      <a
                        href={LEGAL_GUARANTEE_URL_RO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start text-brand-700 underline underline-offset-2 hover:text-brand-800"
                      >
                        europa.eu/youreurope/garanții
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Conținut în curs de actualizare</h2>
              <p className="text-charcoal-500">Această pagină va fi disponibilă în curând.</p>
            </div>
          )}

          {content?.cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-charcoal-50 rounded-xl text-center"
            >
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Ai nevoie de mai multe informații?</h3>
              <p className="text-charcoal-500 mb-6">Contactează-ne pentru o ofertă personalizată.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary">
                  Solicită Ofertă
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/catalog" className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă Catalog
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
