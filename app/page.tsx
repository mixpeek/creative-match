'use client';

import { Card, Badge, Tag, Button, Thumbnail } from '@/components/ui';
import { mockNamespace, mockCreatives } from '@/lib/mock-data';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">Welcome</h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          Your Meta Ad Library is already indexed. Start matching immediately.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Brand Index Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)] mb-4">
            Detected Brand Index
          </h2>
          
          <Badge variant="green" className="mb-4">Indexed</Badge>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--mxp-gray-500)]">Brand</p>
              <p className="text-xl font-semibold text-[var(--mxp-gray-800)]">
                {mockNamespace.brandLabel}
              </p>
            </div>

            <div className="flex items-baseline gap-6">
              <div>
                <p className="text-sm text-[var(--mxp-gray-500)]">Creatives</p>
                <p className="text-2xl font-bold text-[var(--mxp-gray-800)]">
                  {mockNamespace.creativeCount.toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-[var(--mxp-gray-400)]">
                Last indexed: {mockNamespace.lastIndexed}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--mxp-gray-500)] mb-2">Collections</p>
              <div className="flex flex-wrap gap-2">
                {mockNamespace.collections.map((collection) => (
                  <Tag key={collection}>{collection}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-[var(--mxp-gray-100)]">
            <Link href="/add-data">
              <Button variant="primary">Continue</Button>
            </Link>
            <Link href="/add-data">
              <Button variant="secondary">Add more data (optional)</Button>
            </Link>
          </div>
        </Card>

        {/* Right: Creative Preview */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)]">
              Preview: Your Creatives
            </h2>
            <p className="text-sm text-[var(--mxp-gray-500)]">
              A small sample from the indexed library.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {mockCreatives.map((creative) => (
              <div key={creative.id} className="space-y-2">
                <Thumbnail id={`Ad #${creative.id.split('_')[1]}`} size="md" />
                <div className="flex flex-wrap gap-1">
                  {creative.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tip */}
      <p className="text-sm text-[var(--mxp-gray-400)] mt-6">
        Tip: Demo value immediately using indexed creatives, then optionally enrich with uploads.
      </p>
    </div>
  );
}
