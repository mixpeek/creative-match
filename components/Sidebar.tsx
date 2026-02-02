'use client';

import { Home, Database, Sparkles, Tag, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Welcome', icon: Home, letter: 'W' },
  { href: '/add-data', label: 'Add Data', icon: Database, letter: 'A' },
  { href: '/normalize', label: 'Normalize', icon: Sparkles, letter: 'N' },
  { href: '/offers', label: 'Offers', icon: Tag, letter: 'O' },
  { href: '/match', label: 'Match & Export', icon: ArrowRightLeft, letter: 'M' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 bg-white border-r border-[var(--mxp-gray-200)] flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--mxp-purple)] flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="font-semibold text-[var(--mxp-gray-800)]">Mixpeek</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[var(--mxp-purple-light)] text-[var(--mxp-purple)]'
                  : 'text-[var(--mxp-gray-600)] hover:bg-[var(--mxp-gray-100)] hover:text-[var(--mxp-gray-800)]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center text-xs font-semibold ${
                  isActive
                    ? 'bg-[var(--mxp-purple)] text-white'
                    : 'bg-[var(--mxp-gray-200)] text-[var(--mxp-gray-500)]'
                }`}
              >
                {item.letter}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--mxp-gray-200)]">
        <p className="text-xs text-[var(--mxp-gray-400)]">Demo • mocked APIs</p>
      </div>
    </aside>
  );
}
