'use client';

import { useState } from 'react';
import { Search, User, X } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mockResults = [
    { type: 'Offer', name: 'Auto Quote', id: 'offer_auto_quote' },
    { type: 'Creative', name: 'Ad #1032', id: 'creative_1032' },
    { type: 'Dataset', name: 'CTA Landing Pages', id: 'cta_landing_pages' },
  ];

  const filteredResults = searchValue.length > 0
    ? mockResults.filter((r) =>
        r.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        r.type.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <header className="h-14 bg-white border-b border-[var(--mxp-gray-200)] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mxp-gray-400)]" />
          <input
            type="text"
            placeholder="Search offers, creatives, datasets..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => setShowResults(searchValue.length > 0)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full pl-10 pr-10 py-2 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-[var(--mxp-gray-50)] focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20 focus:border-[var(--mxp-purple)] transition-all"
          />
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue('');
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[var(--mxp-gray-200)] rounded"
            >
              <X className="w-3 h-3 text-[var(--mxp-gray-400)]" />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--mxp-gray-200)] rounded-lg shadow-lg z-50 overflow-hidden">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="px-4 py-2 hover:bg-[var(--mxp-gray-50)] cursor-pointer flex items-center justify-between"
                >
                  <span className="text-sm text-[var(--mxp-gray-700)]">{result.name}</span>
                  <span className="text-xs text-[var(--mxp-gray-400)]">{result.type}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[var(--mxp-gray-500)]">
                No results for &quot;{searchValue}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Page title (center) */}
      {title && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="text-sm font-medium text-[var(--mxp-gray-600)]">{title}</h2>
        </div>
      )}

      {/* User */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--mxp-gray-600)]">Brand</span>
        <div className="w-8 h-8 rounded-full bg-[var(--mxp-gray-200)] flex items-center justify-center">
          <User className="w-4 h-4 text-[var(--mxp-gray-500)]" />
        </div>
      </div>
    </header>
  );
}
