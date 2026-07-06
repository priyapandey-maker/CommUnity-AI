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
// Uses Tailwind static classes for both light and dark modes.

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  primary: 'bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-800',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900',
  warning: 'bg-amber-50  text-amber-700  border border-amber-200  dark:bg-amber-950  dark:text-amber-400  dark:border-amber-900',
  error:   'bg-red-50    text-red-700    border border-red-200    dark:bg-red-950    dark:text-red-400    dark:border-red-900',
  info:    'bg-teal-50   text-teal-700   border border-teal-200   dark:bg-teal-950   dark:text-teal-400   dark:border-teal-900',
};

const dotColorClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  primary: 'bg-primary-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error:   'bg-red-500',
  info:    'bg-teal-500',
};

// ── Component ─────────────────────────────────────────────

/**
 * Badge — compact status label with optional dot indicator.
 *
 * @example
 * <Badge variant="primary">Active</Badge>
 * <Badge variant="success" dot>Completed</Badge>
 * <Badge variant="warning">Pending Review</Badge>
 */
export function Badge({
  children,
  variant  = 'default',
  dot      = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider h-6 px-2.5 select-none leading-none border shrink-0',
        variantClasses[variant],
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
