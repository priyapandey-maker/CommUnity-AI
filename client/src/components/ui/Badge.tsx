import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize    = 'sm' | 'md';

export interface BadgeProps {
  children: ReactNode;
  /** Semantic colour variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Show a coloured status dot before the label */
  dot?: boolean;
  className?: string;
}

// ── Style maps ────────────────────────────────────────────

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-4    text-slate-300    border border-line',
  primary: 'bg-brand-950    text-brand-300    border border-brand-800',
  success: 'bg-emerald-950  text-emerald-400  border border-emerald-900',
  warning: 'bg-amber-950    text-amber-400    border border-amber-900',
  error:   'bg-red-950      text-red-400      border border-red-900',
  info:    'bg-sky-950      text-sky-400      border border-sky-900',
};

const dotColorClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  primary: 'bg-brand-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error:   'bg-red-400',
  info:    'bg-sky-400',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs  px-2   py-0.5',
  md: 'text-sm  px-2.5 py-1',
};

// ── Component ─────────────────────────────────────────────

/**
 * Badge — compact status label with optional dot indicator.
 *
 * @example
 * <Badge variant="primary">AI-Powered</Badge>
 * <Badge variant="success" dot>Active</Badge>
 * <Badge variant="warning" size="md">Pending Review</Badge>
 */
export function Badge({
  children,
  variant  = 'default',
  size     = 'sm',
  dot      = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium leading-none select-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            dotColorClasses[variant],
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
