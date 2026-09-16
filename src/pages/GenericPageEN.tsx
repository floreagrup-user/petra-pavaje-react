import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'

const contentMap: Record<string, { title: string; sections: { heading: string; body: string }[]; cta?: boolean }> = {
  'company': {
    title: 'The Company',
    sections: [
      {
        heading: 'Florea Grup',
        body: 'Florea Grup is a Romanian entrepreneurial company, founded in 1996. From a small business, the company has grown continuously, becoming one of the most important players in Transylvania\'s construction industry. With over 600 employees and activities in construction, building materials, fuel distribution, taxi services and tourism, Florea Grup is an example of successful Romanian entrepreneurship.',
      },
      {
        heading: 'Our Values',
        body: 'Respect for customers and employees, professionalism and responsibility are the pillars the company has grown on. Our team is made up of dedicated, hard-working people guided by shared values.',
      },
    ],
    cta: true,
  },
  'cookie-uri': {
    title: 'Cookie Policy',
    sections: [
      {
        heading: 'What Are Cookies',
        body: 'A cookie is a small file sent along with this site\'s pages and stored by your browser. The stored information may be read on a later visit, by this site or by a relevant third party. The site also uses similar local storage (localStorage) to remember your cookie preference.',
      },
      {
        heading: 'Necessary Cookies',
        body: 'These cookies ensure the basic functioning of the site — for example, they remember your choice from the cookie banner, so we don\'t ask again on every visit. We place them without asking for your consent, as they are strictly necessary for the site to work.',
      },
      {
        heading: 'Analytics and Advertising Cookies',
        body: 'As of this policy\'s last update, the site does not place analytics cookies (e.g. Google Analytics) or advertising cookies (e.g. Google Ads) unless you explicitly choose to accept them from the cookie banner or from "Cookie Settings" in the site footer. If we enable such tools in the future, they will only start after your consent, in line with the General Data Protection Regulation (GDPR).',
      },
      {
        heading: 'Managing Your Choice',
        body: 'You can accept, refuse or adjust cookie categories at any time from the "Cookie Settings" link in the footer of every page. You can also delete cookies already stored from your browser settings — on your next visit we will ask for your consent again.',
      },
      {
        heading: 'Your Rights',
        body: 'Under GDPR, you have the right to access, rectify, erase and port your personal data, as well as the right to object to processing or to withdraw your consent at any time. To exercise these rights or for questions about this policy, you can contact us at contact@petrapavaje.ro or at Petra Pavaje, Str. Pietrari nr. 20, Alba Iulia, Romania. You also have the right to file a complaint with the National Supervisory Authority for Personal Data Processing (ANSPDCP).',
      },
    ],
    cta: false,
  },
}

export function GenericPageEN({ title, contentKey }: { title: string; contentKey: string }) {
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
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
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
              {content.sections.map((section, index) => (
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Content Coming Soon</h2>
              <p className="text-charcoal-500">This page will be available soon.</p>
            </div>
          )}

          {content?.cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-charcoal-50 rounded-xl text-center"
            >
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Need more information?</h3>
              <p className="text-charcoal-500 mb-6">Contact us for a personalized quote.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/en/contact" className="btn-primary">
                  Request a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/catalog" className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Catalog
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
