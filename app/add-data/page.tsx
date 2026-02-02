'use client';

import { useState } from 'react';
import { Card, Badge, Button, Tag } from '@/components/ui';
import { sampleDatasets, uploadTypes } from '@/lib/mock-data';
import { Upload, Check, FileText, Link as LinkIcon, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

export default function AddDataPage() {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['cta_landing_pages']);
  const [activeFileType, setActiveFileType] = useState<'CSV' | 'JSON' | 'URL list'>('CSV');

  const toggleDataset = (id: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">
          Add Data (Optional)
        </h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          Upload your data or use a canned dataset to consolidate + normalize.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload datasets */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)] mb-2">
            Upload datasets
          </h2>
          <p className="text-sm text-[var(--mxp-gray-500)] mb-4">
            Bring exports or catalogs to align creatives → offers.
          </p>

          {/* File type toggles */}
          <div className="flex gap-2 mb-4">
            {(['CSV', 'JSON', 'URL list'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveFileType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFileType === type
                    ? 'bg-[var(--mxp-gray-200)] text-[var(--mxp-gray-700)]'
                    : 'bg-[var(--mxp-gray-100)] text-[var(--mxp-gray-500)] hover:bg-[var(--mxp-gray-200)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Drop zone */}
          <div className="border-2 border-dashed border-[var(--mxp-gray-300)] rounded-lg p-6 mb-4 hover:border-[var(--mxp-purple)] transition-colors cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <Upload className="w-8 h-8 text-[var(--mxp-gray-400)] mb-2" />
              <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                Drag & drop files here
              </p>
              <p className="text-xs text-[var(--mxp-gray-500)]">or browse to upload</p>
              <Button variant="secondary" size="sm" className="mt-3">
                Browse files
              </Button>
            </div>
          </div>

          {/* Suggested uploads */}
          <div>
            <p className="text-sm font-medium text-[var(--mxp-gray-600)] mb-3">
              Suggested (most common)
            </p>
            <div className="space-y-2">
              {uploadTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-3 border border-[var(--mxp-gray-200)] rounded-lg hover:border-[var(--mxp-purple)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--mxp-gray-100)] flex items-center justify-center">
                      {type.id === 'platform_performance' && (
                        <FileSpreadsheet className="w-4 h-4 text-[var(--mxp-gray-500)]" />
                      )}
                      {type.id === 'product_catalog' && (
                        <FileText className="w-4 h-4 text-[var(--mxp-gray-500)]" />
                      )}
                      {type.id === 'landing_pages' && (
                        <LinkIcon className="w-4 h-4 text-[var(--mxp-gray-500)]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                        {type.name}
                      </p>
                      <p className="text-xs text-[var(--mxp-gray-500)]">{type.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--mxp-purple)] font-medium">
                    {'platforms' in type && type.platforms}
                    {'format' in type && type.format}
                    {'feature' in type && type.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Sample datasets */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--mxp-gray-800)] mb-2">
            Use sample dataset
          </h2>
          <p className="text-sm text-[var(--mxp-gray-500)] mb-4">
            Instantly show consolidation without needing customer files.
          </p>

          <div className="space-y-3">
            {sampleDatasets.map((dataset) => (
              <div
                key={dataset.id}
                onClick={() => toggleDataset(dataset.id)}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDatasets.includes(dataset.id)
                    ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple-light)]/30'
                    : 'border-[var(--mxp-gray-200)] hover:border-[var(--mxp-purple)]'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-[var(--mxp-gray-700)]">
                    {dataset.name}
                  </p>
                  <p className="text-xs text-[var(--mxp-gray-500)]">{dataset.description}</p>
                  {dataset.recommended && (
                    <Badge variant="green" className="mt-2">
                      Recommended
                    </Badge>
                  )}
                  {dataset.optional && (
                    <Badge variant="gray" className="mt-2">
                      Optional
                    </Badge>
                  )}
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedDatasets.includes(dataset.id)
                      ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple)]'
                      : 'border-[var(--mxp-gray-300)]'
                  }`}
                >
                  {selectedDatasets.includes(dataset.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTAs */}
      <div className="flex justify-end gap-3 mt-6">
        <Link href="/normalize">
          <Button variant="secondary">Skip for now</Button>
        </Link>
        <Link href="/normalize">
          <Button variant="primary">Ingest & Continue</Button>
        </Link>
      </div>
    </div>
  );
}
