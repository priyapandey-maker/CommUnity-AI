import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'white' | 'accent';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual size of the spinner ring */
  size?: SpinnerSize;
  /** Color variant matching the design palette */
  color?: SpinnerColor;
  /** Accessible label read by screen readers */
  label?: string;
}

// ── Style maps ────────────────────────────────────────────

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
};

const colorClasses: Record<SpinnerColor, string> = {
  primary: 'border-brand-500   border-t-transparent',
  white:   'border-white/70    border-t-transparent',
  accent:  'border-accent-400  border-t-transparent',
};

// ── Component ─────────────────────────────────────────────

/**
 * Spinner — animated loading indicator.
 *
 * @example
 * <Spinner size="md" color="primary" />
 * <Spinner size="sm" color="white" label="Saving…" />
 */
export function Spinner({
  size  = 'md',
  color = 'primary',
  label = 'Loading…',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      {...rest}
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <span
        className={cn(
          'block rounded-full animate-spinner',
          sizeClasses[size],
          colorClasses[color],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
