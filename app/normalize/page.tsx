'use client';

import { useState, useEffect } from 'react';
import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import { mockJobProgress, mockMappingPreview } from '@/lib/mock-data';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function NormalizePage() {
  const [progress, setProgress] = useState(mockJobProgress);
  const [showMoreMappings, setShowMoreMappings] = useState(false);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => ({
        ...prev,
        steps: prev.steps.map((step) => ({
          ...step,
          progress: Math.min(step.progress + Math.random() * 5, 100),
          status: step.progress >= 95 ? 'completed' : 'running',
        })),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const allComplete = progress.steps.every((s) => s.progress >= 100);

  return (
    <div className="animate-fade-in max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">
          Normalize & Enrich
        </h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          We&apos;ll build canonical Offers/Products/Context and link them to your creatives.
        </p>
      </div>

      {/* Job Progress Card */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[var(--mxp-gray-800)]">
            Job: Normalize demo pack + link creatives → offers
          </h2>
          <Badge variant={allComplete ? 'green' : 'orange'}>
            {allComplete ? 'Completed' : 'Running'}
          </Badge>
        </div>

        <div className="space-y-3">
          {progress.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <p className="text-sm text-[var(--mxp-gray-600)] w-48 flex-shrink-0">
                {step.name}
              </p>
              <ProgressBar progress={step.progress} className="flex-1" showLabel />
            </div>
          ))}
        </div>
      </Card>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapping Preview */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[var(--mxp-gray-800)]">
              Mapping preview
            </h2>
            <p className="text-sm text-[var(--mxp-gray-500)]">
              Only a few rows — expand for details.
            </p>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--mxp-gray-200)]">
                <th className="text-left py-3 text-sm font-medium text-[var(--mxp-gray-500)]">
                  Source field
                </th>
                <th className="text-left py-3 text-sm font-medium text-[var(--mxp-gray-500)]">
                  Canonical
                </th>
              </tr>
            </thead>
            <tbody>
              {mockMappingPreview
                .slice(0, showMoreMappings ? undefined : 5)
                .map((mapping, index) => (
                  <tr key={index} className="border-b border-[var(--mxp-gray-100)]">
                    <td className="py-3 text-sm text-[var(--mxp-gray-600)] font-mono">
                      {mapping.sourceField}
                    </td>
                    <td className="py-3 text-sm text-[var(--mxp-gray-800)] font-mono">
                      {mapping.canonicalField}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => setShowMoreMappings(!showMoreMappings)}
          >
            <ChevronDown
              className={`w-4 h-4 mr-1 transition-transform ${showMoreMappings ? 'rotate-180' : ''}`}
            />
            {showMoreMappings ? 'View less' : 'View more'}
          </Button>
        </Card>

        {/* Checks */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-[var(--mxp-gray-800)] mb-4">
            Checks
          </h2>

          <div className="space-y-3">
            {progress.warnings.map((warning, index) => (
              <div
                key={index}
                className="p-3 bg-[var(--mxp-orange-light)]/50 border border-[var(--mxp-orange)]/20 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="orange">Review</Badge>
                </div>
                <p className="text-sm font-medium text-[var(--mxp-gray-800)]">
                  {warning.type}
                </p>
                <p className="text-xs text-[var(--mxp-gray-500)]">
                  {warning.count} {warning.type.includes('URLs') ? 'creatives' : 'candidates'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="flex justify-end mt-6">
        <Link href="/offers">
          <Button variant="primary">View Offers</Button>
        </Link>
      </div>
    </div>
  );
}
