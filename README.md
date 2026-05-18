# Petra Pavaje - Website Redesign

> Ultra-modern, premium industrial website for Romania's leading paver manufacturer.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS v4 + CSS Variables
- **UI Components**: shadcn/ui + Lucide Icons
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Hosting**: Cloudflare Pages
- **Storage**: Cloudflare R2 (images, virtual tour assets)
- **Functions**: Cloudflare Pages Functions (form handling)
- **CDN**: Cloudflare global edge cache

## Architecture

```
petra-pavaje-react/
├── public/
│   ├── images/           # Static images (logos, icons)
│   ├── fonts/            # Self-hosted fonts
│   ├── virtual-tour/     # Marzipano tour assets
│   └── _redirects        # Cloudflare Pages redirect rules
├── functions/
│   └── api/
│       └── contact.ts    # Form submission handler (Cloudflare Function)
├── src/
│   ├── assets/           # Build-time assets
│   ├── components/
│   │   ├── header/       # Header, navigation, mega menu
│   │   ├── footer/       # Footer with columns
│   │   ├── sections/     # Homepage sections (Hero, Categories, etc.)
│   │   ├── ui/           # Reusable UI components
│   │   └── common/       # Common components (buttons, cards)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   │   ├── HomePage.tsx
│   │   ├── ProductCategoryPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── VirtualTourPage.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   ├── data/             # Static content (products, categories, factories)
│   │   ├── types.ts      # TypeScript interfaces
│   │   ├── products.ts   # Product catalog
│   │   ├── site.ts       # Categories, factories, testimonials
│   │   └── menu.ts       # Navigation structure
│   ├── styles/           # Global styles, Tailwind config
│   └── router.tsx        # React Router configuration
├── index.html            # HTML template with SEO meta
├── vite.config.ts        # Vite configuration
├── wrangler.toml         # Cloudflare Workers/Pages config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/petra-pavaje-react.git
cd petra-pavaje-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Cloudflare Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions triggers automatically
3. Cloudflare Pages builds and deploys

### Manual Deploy

```bash
npx wrangler pages deploy dist
```

### Environment Variables

Set these in Cloudflare Pages dashboard:

| Variable | Description |
|----------|-------------|
| `VITE_SITE_URL` | Production URL (https://petrapavaje.ro) |
| `VITE_R2_URL` | R2 bucket public URL |
| `RESEND_API_KEY` | Resend API key for email (for Cloudflare Functions) |

## Cloudflare R2 Setup

Create an R2 bucket for storing images:

```bash
# Create bucket
npx wrangler r2 bucket create petra-pavaje-images

# Upload images
npx wrangler r2 object put petra-pavaje-images/images/hero.avif --file=./hero.avif

# Set public access (via custom domain)
# Configure R2.dev subdomain or custom domain in Cloudflare dashboard
```

## Virtual Tour Integration

The virtual tour system uses Marzipano with assets stored in R2:

1. Create panoramic images (equirectangular projection)
2. Upload to R2 bucket under `virtual-tour/`
3. Initialize Marzipano in `VirtualTourPage.tsx`
4. Configure hotspots and navigation points

```bash
# Example Marzipano setup
npm install marzipano
```

## Content Management

Content is stored as TypeScript files in `src/data/`:

- **Products**: `src/data/products.ts`
- **Categories**: `src/data/site.ts`
- **Factories**: `src/data/site.ts`
- **Testimonials**: `src/data/site.ts`
- **Menu**: `src/data/menu.ts`

To add a new product, simply add an entry to the `products` array.

## SEO Strategy

### On-Page SEO

- Semantic HTML structure
- Proper heading hierarchy (H1 > H2 > H3)
- Meta descriptions and Open Graph tags
- Schema.org JSON-LD structured data
- Canonical URLs
- XML sitemap (generate at build time)

### Target Keywords

- `pavaje`
- `pavaj premium`
- `pavaj curte`
- `garduri beton`
- `amenajari exterioare`
- `prefabricate beton`
- `dale beton`
- `borduri`

### Redirects

All old WordPress URLs are redirected via `public/_redirects` to preserve SEO equity.

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | 95+ |
| LCP | < 1.8s |
| CLS | < 0.05 |
| FID | < 100ms |
| Bundle Size | < 200KB (gzipped) |

### Optimization Strategies

- Code splitting via Vite manual chunks
- Lazy loading images with `loading="lazy"`
- AVIF/WebP image formats
- CSS-in-JS elimination (Tailwind utility classes)
- Minimal JavaScript bundle
- Edge caching via Cloudflare CDN

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `anthracite-900` | `#2f2f37` | Primary text, dark backgrounds |
| `anthracite-950` | `#1a1a21` | Footer, headers |
| `warm-50` | `#fdfcfa` | Page background |
| `stone-100` | `#f7f3ee` | Section backgrounds |
| `primary-600` | `#8a4545` | CTAs, accents |
| `accent-600` | `#486348` | Sustainability, eco |

### Typography

- **Font**: Inter (300, 400, 500, 600, 700, 800)
- **Display**: 4xl-8xl, bold, tight tracking
- **Body**: base-lg, relaxed line-height

### Components

All components follow a consistent pattern:
- `card-premium` - Elevated cards with hover effects
- `btn-primary` / `btn-secondary` / `btn-accent` - Button variants
- `heading-h1` / `heading-h2` / `heading-h3` - Heading styles
- `container-premium` - Max-width container with padding

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

© 2025 Petra Pavaje | Florea Grup
