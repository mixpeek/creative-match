'use client';

import { ReactNode } from 'react';
import { Play } from 'lucide-react';

// Badge Component
interface BadgeProps {
  variant?: 'purple' | 'green' | 'orange' | 'gray';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  const variants = {
    purple: 'bg-[var(--mxp-purple-light)] text-[var(--mxp-purple)]',
    green: 'bg-[var(--mxp-green-light)] text-[var(--mxp-green)]',
    orange: 'bg-[var(--mxp-orange-light)] text-[var(--mxp-orange)]',
    gray: 'bg-[var(--mxp-gray-200)] text-[var(--mxp-gray-600)]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Tag Component
interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 bg-[var(--mxp-gray-100)] text-[var(--mxp-gray-600)] rounded text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

// Button Component
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const variants = {
    primary: 'bg-[var(--mxp-purple)] text-white hover:bg-[var(--mxp-purple-dark)]',
    secondary: 'bg-white text-[var(--mxp-gray-700)] border border-[var(--mxp-gray-300)] hover:bg-[var(--mxp-gray-50)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[var(--mxp-gray-200)] shadow-sm ${
        hover ? 'hover:border-[var(--mxp-purple)] hover:shadow-md transition-all duration-150' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Thumbnail Component
interface ThumbnailProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showPlay?: boolean;
}

export function Thumbnail({ id, size = 'md', className = '', showPlay = true }: ThumbnailProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div
      className={`bg-gradient-to-br from-[var(--mxp-gray-100)] to-[var(--mxp-gray-200)] rounded-lg flex items-center justify-center relative ${sizes[size]} ${className}`}
    >
      {id && (
        <span className="absolute top-1.5 left-1.5 text-[10px] text-[var(--mxp-gray-500)] font-medium">
          {id}
        </span>
      )}
      {showPlay && (
        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
          <Play className="w-4 h-4 text-[var(--mxp-gray-500)] ml-0.5" />
        </div>
      )}
    </div>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className = '', showLabel = false }: ProgressBarProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 bg-[var(--mxp-gray-200)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--mxp-purple)] to-[var(--mxp-purple-dark)] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--mxp-gray-500)] w-10 text-right">{progress}%</span>
      )}
    </div>
  );
}

// Score Badge Component
interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className = '' }: ScoreBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[3rem] px-2.5 py-1 bg-gradient-to-br from-[var(--mxp-purple)] to-[var(--mxp-purple-dark)] text-white rounded-md text-sm font-semibold ${className}`}
    >
      {score.toFixed(1)}
    </span>
  );
}
