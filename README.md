# MXP Brand Offer → Match Explorer

A demo app showcasing Mixpeek's brand creative-to-offer alignment workflow. This is a fully static, self-hostable application that demonstrates the UX flow for brand-side users to connect their creative library with offers and export mappings for ad serving systems.

## What This Demo Proves

1. **Your creatives are already indexed** - Users land with their Meta Ad Library pre-indexed
2. **Consolidate data easily** - Optional upload of platform exports, catalogs, landing pages
3. **Automatic normalization** - Transforms disparate data into canonical Offers/Products/Context
4. **Offer-centric browsing** - View creatives aligned to each offer
5. **Export-ready outputs** - CSV mappings, JSON payloads, Prebid RTD format

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for static hosting
npm run build

# Preview static build
npx serve out
```

## Deployment

This app exports as a fully static site. After running `npm run build`, deploy the `out/` directory to any static hosting:

- **Vercel**: Push to GitHub, import project
- **Netlify**: Drag & drop the `out/` folder
- **GitHub Pages**: Push `out/` contents to `gh-pages` branch
- **S3/CloudFront**: Upload `out/` to S3 bucket with website hosting

## App Flow

### Step 0: Welcome (`/`)
- Shows detected brand index (GEICO demo)
- Displays creative count and sample thumbnails
- CTAs: Continue or Add more data

### Step 1: Add Data (`/add-data`)
- Upload platform exports (CSV/JSON/URLs)
- Or use canned sample datasets
- CTAs: Skip or Ingest & Continue

### Step 2: Normalize & Enrich (`/normalize`)
- Progress indicators for ingestion jobs
- Mapping preview (source → canonical)
- Data quality checks and warnings
- CTA: View Offers

### Step 3: Offer View (`/offers`)
- 3-panel layout: Offer list | Creatives | Details
- Browse by category (Auto Insurance, Running Shoes, etc.)
- See aligned creatives with tags and compliance status
- CTA: Match & Export

### Step 4: Match & Export (`/match`)
- Context input (URL or transcript)
- Offer selector with advanced constraints
- Ranked creative results with scores
- Export formats: CSV, JSON, Prebid RTD
- One-click copy/export

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **Static Export** - No server required

## Mock Data

All API responses are mocked in `lib/mock-data.ts`. The demo uses deterministic fixtures for repeatable demos. In production, these would be replaced with real Mixpeek API calls.

## Customization

### Brand/Demo Data
Edit `lib/mock-data.ts` to change:
- Namespace/brand details
- Sample creatives
- Offer categories and attributes
- Match results

### Styling
The app uses Mixpeek's brand colors defined in `app/globals.css`:
- `--mxp-purple`: Primary purple (#7C5CFC)
- `--mxp-green`: Success green (#22C55E)  
- `--mxp-orange`: Warning orange (#F97316)

### Adding Real API Integration
Replace mock data imports with actual fetch calls to Mixpeek API endpoints. The expected schemas are documented in the PRD.

## License

Internal demo - not for redistribution.
