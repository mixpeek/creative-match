'use client';

import { useState } from 'react';
import { Card, Badge, Tag, Button, Thumbnail } from '@/components/ui';
import { mockOffers, mockOfferCreatives } from '@/lib/mock-data';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Group offers by category
const groupedOffers = mockOffers.reduce((acc, offer) => {
  if (!acc[offer.category]) {
    acc[offer.category] = [];
  }
  acc[offer.category].push(offer);
  return acc;
}, {} as Record<string, typeof mockOffers>);

export default function OffersPage() {
  const [selectedOfferId, setSelectedOfferId] = useState(mockOffers[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    Object.keys(groupedOffers)
  );

  const selectedOffer = mockOffers.find((o) => o.id === selectedOfferId);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">Offer View</h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          Browse normalized offers. See the creatives aligned to each offer.
        </p>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-220px)]">
        {/* Left: Offer list */}
        <Card className="col-span-3 p-4 overflow-y-auto">
          <h2 className="text-base font-semibold text-[var(--mxp-gray-800)] mb-3">
            Offers
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mxp-gray-400)]" />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-[var(--mxp-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20 focus:border-[var(--mxp-purple)]"
            />
          </div>

          {/* Grouped offers */}
          <div className="space-y-2">
            {Object.entries(groupedOffers).map(([category, offers]) => (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-[var(--mxp-gray-600)]"
                >
                  {category}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedCategories.includes(category) ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {expandedCategories.includes(category) && (
                  <div className="space-y-1 ml-2">
                    {offers
                      .filter((o) =>
                        o.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((offer) => (
                        <button
                          key={offer.id}
                          onClick={() => setSelectedOfferId(offer.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                            selectedOfferId === offer.id
                              ? 'bg-[var(--mxp-purple-light)] text-[var(--mxp-purple)]'
                              : 'text-[var(--mxp-gray-700)] hover:bg-[var(--mxp-gray-100)]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                selectedOfferId === offer.id
                                  ? 'bg-[var(--mxp-purple)]'
                                  : 'bg-[var(--mxp-gray-300)]'
                              }`}
                            />
                            {offer.name}
                          </div>
                          <span className="text-xs text-[var(--mxp-gray-400)]">
                            {offer.creativeCount}
                          </span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Center: Creatives for offer */}
        <Card className="col-span-5 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[var(--mxp-gray-800)]">
              Creatives for: {selectedOffer?.name}
            </h2>
            <p className="text-sm text-[var(--mxp-gray-500)]">
              Aligned using destination URL + similarity.
            </p>
          </div>

          <div className="space-y-3">
            {mockOfferCreatives.map((creative) => (
              <div
                key={creative.id}
                className="flex gap-4 p-3 border border-[var(--mxp-gray-200)] rounded-lg hover:border-[var(--mxp-purple)] transition-colors"
              >
                <Thumbnail
                  id={`Ad #${creative.id.split('_')[1]}`}
                  size="lg"
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--mxp-gray-800)] mb-1">
                    {creative.title}
                  </p>
                  <p className="text-xs text-[var(--mxp-gray-500)] mb-2">
                    Concepts: {creative.tags.join(' · ')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="green">Offer aligned</Badge>
                    <Badge variant="gray">{creative.aspectRatio}</Badge>
                    <Badge variant="green">Compliance OK</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Offer details */}
        <Card className="col-span-4 p-4 overflow-y-auto">
          <h2 className="text-base font-semibold text-[var(--mxp-gray-800)] mb-4">
            Offer details
          </h2>

          <Badge variant="purple" className="mb-4">
            Canonical Offer
          </Badge>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--mxp-gray-800)]">
                {selectedOffer?.name}
              </h3>
            </div>

            <div>
              <p className="text-sm text-[var(--mxp-gray-500)]">Destination</p>
              <a
                href="#"
                className="text-sm text-[var(--mxp-purple)] hover:underline"
              >
                {selectedOffer?.destinationUrl}
              </a>
            </div>

            <div>
              <p className="text-sm text-[var(--mxp-gray-500)] mb-2">Key attributes</p>
              <ul className="text-sm text-[var(--mxp-gray-700)] space-y-1">
                <li>• Category: {selectedOffer?.category}</li>
                <li>• CTA: {selectedOffer?.attributes.cta}</li>
                <li>• Angle: {selectedOffer?.attributes.angle}</li>
                <li>• Audience: {selectedOffer?.attributes.audience}</li>
              </ul>
            </div>

            {selectedOffer?.performance && (
              <div>
                <p className="text-sm text-[var(--mxp-gray-500)] mb-2">
                  Performance (optional)
                </p>
                <div className="flex gap-2">
                  <Badge variant="gray">CTR {selectedOffer.performance.ctr}</Badge>
                  <Badge variant="gray">Spend {selectedOffer.performance.spend}</Badge>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="flex justify-end mt-4">
        <Link href="/match">
          <Button variant="primary">Match & Export</Button>
        </Link>
      </div>
    </div>
  );
}
