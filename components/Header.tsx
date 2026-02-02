'use client';

import { Search, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-[var(--mxp-gray-200)] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mxp-gray-400)]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-[var(--mxp-gray-200)] rounded-lg bg-[var(--mxp-gray-50)] focus:outline-none focus:ring-2 focus:ring-[var(--mxp-purple)] focus:ring-opacity-20 focus:border-[var(--mxp-purple)] transition-all"
          />
        </div>
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
