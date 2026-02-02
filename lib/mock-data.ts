// Types
export interface Creative {
  id: string;
  title: string;
  thumbnailUrl?: string;
  tags: string[];
  assetType: 'video' | 'image';
  aspectRatio?: string;
  duration?: number;
}

export interface Offer {
  id: string;
  name: string;
  category: string;
  destinationUrl: string;
  creativeCount: number;
  attributes: {
    cta: string;
    angle: string;
    audience: string;
  };
  performance?: {
    ctr: string;
    spend: string;
  };
}

export interface OfferCreative extends Creative {
  score?: number;
  rationale?: string;
  alignment: 'offer_aligned' | 'partial' | 'unaligned';
  compliance: 'ok' | 'review' | 'flagged';
}

export interface MatchResult {
  creative: OfferCreative;
  score: number;
  rationale: string;
  brandSafe: boolean;
}

export interface Namespace {
  id: string;
  brandLabel: string;
  creativeCount: number;
  lastIndexed: string;
  collections: string[];
}

export interface JobProgress {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  steps: {
    name: string;
    progress: number;
    status: 'pending' | 'running' | 'completed';
  }[];
  warnings: {
    type: string;
    count: number;
  }[];
}

export interface MappingPreview {
  sourceField: string;
  canonicalField: string;
}

// Mock Data
export const mockNamespace: Namespace = {
  id: 'ns_geico_demo',
  brandLabel: 'GEICO (demo)',
  creativeCount: 12480,
  lastIndexed: '18 min ago',
  collections: ['Creatives', 'Thumbnails', 'Concepts'],
};

export const mockCreatives: Creative[] = Array.from({ length: 8 }, (_, i) => ({
  id: `creative_${100 + i}`,
  title: `Ad #${100 + i}`,
  tags: ['auto', 'savings'],
  assetType: 'video',
  aspectRatio: '9:16',
  duration: 15,
}));

export const mockOffers: Offer[] = [
  {
    id: 'offer_auto_quote',
    name: 'Auto Insurance Quote',
    category: 'Auto Insurance',
    destinationUrl: 'example.com/auto-quote',
    creativeCount: 178,
    attributes: {
      cta: 'Get a quote',
      angle: 'Savings',
      audience: 'New drivers',
    },
    performance: {
      ctr: '2.1%',
      spend: '$1.2M',
    },
  },
  {
    id: 'offer_usage_based',
    name: 'Usage-based',
    category: 'Auto Insurance',
    destinationUrl: 'example.com/usage-based',
    creativeCount: 64,
    attributes: {
      cta: 'Learn more',
      angle: 'Pay per mile',
      audience: 'Low-mileage drivers',
    },
  },
  {
    id: 'offer_roadside',
    name: 'Roadside add-on',
    category: 'Auto Insurance',
    destinationUrl: 'example.com/roadside',
    creativeCount: 22,
    attributes: {
      cta: 'Add coverage',
      angle: 'Peace of mind',
      audience: 'Existing customers',
    },
  },
  {
    id: 'offer_trainers',
    name: 'Everyday trainers',
    category: 'Running Shoes',
    destinationUrl: 'example.com/trainers',
    creativeCount: 106,
    attributes: {
      cta: 'Shop now',
      angle: 'Comfort',
      audience: 'Casual runners',
    },
  },
  {
    id: 'offer_max_cushion',
    name: 'Max cushion',
    category: 'Running Shoes',
    destinationUrl: 'example.com/max-cushion',
    creativeCount: 58,
    attributes: {
      cta: 'Shop now',
      angle: 'Performance',
      audience: 'Marathon runners',
    },
  },
  {
    id: 'offer_same_day',
    name: 'Same-day delivery',
    category: 'Grocery Delivery',
    destinationUrl: 'example.com/same-day',
    creativeCount: 92,
    attributes: {
      cta: 'Order now',
      angle: 'Convenience',
      audience: 'Busy professionals',
    },
  },
  {
    id: 'offer_free_trial',
    name: 'Free trial',
    category: 'Grocery Delivery',
    destinationUrl: 'example.com/free-trial',
    creativeCount: 41,
    attributes: {
      cta: 'Start trial',
      angle: 'Try risk-free',
      audience: 'New customers',
    },
  },
];

export const mockOfferCreatives: OfferCreative[] = Array.from({ length: 4 }, (_, i) => ({
  id: `creative_${200 + i}`,
  title: `Auto Quote — Variant ${i + 1}`,
  tags: ['savings', 'quick quote', 'family'],
  assetType: 'video',
  aspectRatio: '9:16',
  alignment: 'offer_aligned',
  compliance: 'ok',
}));

export const mockMatchResults: MatchResult[] = Array.from({ length: 5 }, (_, i) => ({
  creative: {
    id: `creative_${1032 + i}`,
    title: `Auto Quote — Variant ${i + 1}`,
    tags: ['savings', 'DIY/home context', 'quote CTA'],
    assetType: 'video',
    aspectRatio: '9:16',
    alignment: 'offer_aligned',
    compliance: 'ok',
  },
  score: 92 - i * 3,
  rationale: 'savings + DIY/home context + quote CTA',
  brandSafe: true,
}));

export const mockJobProgress: JobProgress = {
  id: 'job_demo_001',
  status: 'running',
  steps: [
    { name: 'Fetch landing pages', progress: 85, status: 'running' },
    { name: 'Build offers', progress: 62, status: 'running' },
    { name: 'Link creatives → offers', progress: 44, status: 'running' },
    { name: 'Extract concepts', progress: 30, status: 'running' },
  ],
  warnings: [
    { type: 'Missing destination URLs', count: 214 },
    { type: 'Duplicate offers detected', count: 3 },
    { type: 'Policy keywords flagged', count: 3 },
  ],
};

export const mockMappingPreview: MappingPreview[] = [
  { sourceField: 'meta.ad_name', canonicalField: 'Creative.title' },
  { sourceField: 'meta.video_url', canonicalField: 'Creative.asset_url' },
  { sourceField: 'meta.final_url', canonicalField: 'Offer.destination_url' },
  { sourceField: 'sheet.offer_name', canonicalField: 'Offer.name' },
  { sourceField: 'ga4.referrer', canonicalField: 'Context.referrer' },
];

export const sampleDatasets = [
  {
    id: 'cta_landing_pages',
    name: 'CTA landing pages',
    description: 'Build offers from creative destinations',
    recommended: true,
  },
  {
    id: 'performance_export',
    name: 'Performance export',
    description: 'Sample CTR/CPA across platforms',
    optional: true,
  },
  {
    id: 'offer_catalog',
    name: 'Offer catalog',
    description: 'Example offers + categories',
    optional: true,
  },
];

export const uploadTypes = [
  {
    id: 'platform_performance',
    name: 'Platform performance export',
    description: 'spend, impressions, CTR',
    platforms: 'Meta/Google/TikTok',
  },
  {
    id: 'product_catalog',
    name: 'Product / offer catalog',
    description: 'offer_id, name, URL, category',
    format: 'Sheet/CSV',
  },
  {
    id: 'landing_pages',
    name: 'Landing page URLs',
    description: 'from creative CTA links',
    feature: 'Auto-scrape',
  },
];
