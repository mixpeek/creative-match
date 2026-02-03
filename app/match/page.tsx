'use client';

import { useState } from 'react';
import { Card, Badge, Button, Thumbnail, ScoreBadge } from '@/components/ui';
import { mockOffers, mockMatchResults } from '@/lib/mock-data';
import { Copy, ChevronDown, Check, Download, RefreshCw } from 'lucide-react';

type ExportFormat = 'csv' | 'json' | 'prebid';

interface AdvancedFilters {
  platform: string;
  aspectRatio: string;
  duration: string;
  brandSafety: string;
}

export default function MatchExportPage() {
  const [contextInput, setContextInput] = useState('');
  const [selectedOfferId, setSelectedOfferId] = useState(mockOffers[0].id);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasMatched, setHasMatched] = useState(true);
  const [activeExport, setActiveExport] = useState<ExportFormat>('csv');
  const [copied, setCopied] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [exported, setExported] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    platform: 'Any',
    aspectRatio: 'Any',
    duration: 'Any',
    brandSafety: 'Required',
  });

  const selectedOffer = mockOffers.find((o) => o.id === selectedOfferId);

  const getExportData = () => {
    const offerId = selectedOfferId || 'offer_auto_quote';
    const contextSummary = contextInput || 'DIY/home improvement content';

    const csvOutput = `offer_id,creative_id,score,rationale
${offerId},creative_1032,92.0,"savings"
${offerId},creative_1033,89.0,"quick quote"
${offerId},creative_1034,86.0,"discount"`;

    const jsonOutput = JSON.stringify({
      offer_id: offerId,
      creatives: [
        { id: "creative_1032", score: 92.0, rationale: "savings messaging" },
        { id: "creative_1033", score: 89.0, rationale: "quick quote CTA" },
        { id: "creative_1034", score: 86.0, rationale: "discount theme" }
      ],
      constraints: {
        platform: advancedFilters.platform.toLowerCase(),
        aspect_ratio: advancedFilters.aspectRatio,
        duration: advancedFilters.duration,
        brand_safety: advancedFilters.brandSafety === 'Required'
      },
      context_summary: contextSummary
    }, null, 2);

    const prebidOutput = JSON.stringify({
      name: "mixpeek",
      params: {
        offer_id: offerId,
        creatives: ["creative_1032", "creative_1033"],
        brand_safety: advancedFilters.brandSafety === 'Required'
      }
    }, null, 2);

    return { csv: csvOutput, json: jsonOutput, prebid: prebidOutput };
  };

  const { csv: csvOutput, json: jsonOutput, prebid: prebidOutput } = getExportData();

  const handleCopy = () => {
    const outputs = { csv: csvOutput, json: jsonOutput, prebid: prebidOutput };
    navigator.clipboard.writeText(outputs[activeExport]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const outputs = { csv: csvOutput, json: jsonOutput, prebid: prebidOutput };
    const extensions = { csv: 'csv', json: 'json', prebid: 'json' };
    const mimeTypes = { csv: 'text/csv', json: 'application/json', prebid: 'application/json' };

    const content = outputs[activeExport];
    const blob = new Blob([content], { type: mimeTypes[activeExport] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creative_match_export_${selectedOfferId}.${extensions[activeExport]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const runMatch = () => {
    setIsMatching(true);
    // Simulate matching process
    setTimeout(() => {
      setHasMatched(true);
      setIsMatching(false);
    }, 800);
  };

  const handleNewMatch = () => {
    setContextInput('');
    setSelectedOfferId(mockOffers[0].id);
    setHasMatched(false);
    setShowAdvanced(false);
    setAdvancedFilters({
      platform: 'Any',
      aspectRatio: 'Any',
      duration: 'Any',
      brandSafety: 'Required',
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--mxp-gray-800)]">
          Match & Export
        </h1>
        <p className="text-[var(--mxp-gray-500)] mt-1">
          Match context → best creatives, then export mappings for your systems.
        </p>
      </div>

      {/* Match Builder */}
      <Card className="p-6 mb-6">
        <h2 className="text-base font-semibold text-[var(--mxp-gray-800)] mb-4">
          Match builder
        </h2>

        <div className="flex gap-4 items-end">
          {/* Context input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Context: paste URL or transcript..."
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20 focus:border-[var(--mxp-purple)]"
            />
          </div>

          {/* Offer selector */}
          <div className="w-64">
            <select
              value={selectedOfferId}
              onChange={(e) => setSelectedOfferId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20 focus:border-[var(--mxp-purple)]"
            >
              {mockOffers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  Offer: {offer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Match button */}
          <Button variant="primary" onClick={runMatch} disabled={isMatching}>
            {isMatching ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Matching...
              </>
            ) : (
              'Match'
            )}
          </Button>
        </div>

        {/* Advanced toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 mt-4 text-sm text-[var(--mxp-gray-500)] hover:text-[var(--mxp-gray-700)]"
        >
          Advanced
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </button>

        {showAdvanced && (
          <div className="mt-4 p-4 bg-[var(--mxp-gray-50)] rounded-lg grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-[var(--mxp-gray-500)] mb-1">
                Platform
              </label>
              <select
                value={advancedFilters.platform}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, platform: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20"
              >
                <option>Any</option>
                <option>Meta</option>
                <option>Google</option>
                <option>TikTok</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--mxp-gray-500)] mb-1">
                Aspect ratio
              </label>
              <select
                value={advancedFilters.aspectRatio}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, aspectRatio: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20"
              >
                <option>Any</option>
                <option>9:16</option>
                <option>16:9</option>
                <option>1:1</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--mxp-gray-500)] mb-1">
                Duration
              </label>
              <select
                value={advancedFilters.duration}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20"
              >
                <option>Any</option>
                <option>&lt;15s</option>
                <option>15-30s</option>
                <option>&gt;30s</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--mxp-gray-500)] mb-1">
                Brand safety
              </label>
              <select
                value={advancedFilters.brandSafety}
                onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, brandSafety: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20"
              >
                <option>Required</option>
                <option>Optional</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Results + Export */}
      <div className="grid grid-cols-12 gap-6">
        {/* Ranked creatives */}
        <div className="col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[var(--mxp-gray-800)]">
                Ranked creatives
              </h2>
              <span className="text-sm text-[var(--mxp-gray-500)]">
                5 only — keep it readable.
              </span>
            </div>

            {hasMatched ? (
              <div className="space-y-3">
                {mockMatchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border border-[var(--mxp-gray-200)] rounded-lg hover:border-[var(--mxp-purple)] transition-colors"
                  >
                    <Thumbnail
                      id={`Ad #${result.creative.id.split('_')[1]}`}
                      size="md"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--mxp-gray-800)]">
                        {result.creative.title}
                      </p>
                      <p className="text-xs text-[var(--mxp-gray-500)]">
                        Why: {result.rationale}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="green">Offer aligned</Badge>
                        <Badge variant="gray">Brand safe</Badge>
                      </div>
                    </div>
                    <ScoreBadge score={result.score} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--mxp-gray-400)]">
                Enter context and click Match to see results
              </div>
            )}
          </Card>
        </div>

        {/* Export panel */}
        <div className="col-span-4">
          <Card className="p-6">
            <h2 className="text-base font-semibold text-[var(--mxp-gray-800)] mb-2">
              Export
            </h2>
            <p className="text-sm text-[var(--mxp-gray-500)] mb-4">
              Choose an output format and copy/export.
            </p>

            {/* Export format buttons */}
            <div className="space-y-2 mb-4">
              {[
                { id: 'csv' as ExportFormat, label: 'CSV mapping', desc: 'offer_id, creative_id, score, rationale' },
                { id: 'json' as ExportFormat, label: 'JSON payload', desc: 'Generic match payload for internal tools' },
                { id: 'prebid' as ExportFormat, label: 'Prebid RTD (optional)', desc: 'Toggle on in Advanced' },
              ].map((format) => (
                <button
                  key={format.id}
                  onClick={() => setActiveExport(format.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    activeExport === format.id
                      ? 'border-[var(--mxp-purple)] bg-[var(--mxp-purple-light)]/30'
                      : 'border-[var(--mxp-gray-200)] hover:border-[var(--mxp-purple)]'
                  }`}
                >
                  <Badge
                    variant={activeExport === format.id ? 'purple' : 'gray'}
                    className="mb-1"
                  >
                    {format.label}
                  </Badge>
                  <p className="text-xs text-[var(--mxp-gray-500)]">{format.desc}</p>
                </button>
              ))}
            </div>

            {/* Code preview */}
            <div className="bg-[var(--mxp-gray-900)] rounded-lg p-4 mb-4 relative">
              <pre className="text-xs text-[var(--mxp-gray-300)] font-mono overflow-x-auto whitespace-pre-wrap">
                {activeExport === 'csv' && csvOutput}
                {activeExport === 'json' && jsonOutput}
                {activeExport === 'prebid' && prebidOutput}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleExport}>
                {exported ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Exported!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={handleNewMatch}>
          <RefreshCw className="w-4 h-4 mr-1" />
          New match
        </Button>
        <Button variant="primary" onClick={handleExport}>
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
}
