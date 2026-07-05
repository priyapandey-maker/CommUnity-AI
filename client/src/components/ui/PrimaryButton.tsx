import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

// ── Types ─────────────────────────────────────────────────

export type PrimaryButtonSize    = 'sm' | 'md' | 'lg';
export type PrimaryButtonVariant = 'solid' | 'gradient';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Height / padding / font-size preset */
  size?: PrimaryButtonSize;
  /** Show spinner and disable interactions while true */
  loading?: boolean;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Solid fill vs. brand-to-accent gradient */
  variant?: PrimaryButtonVariant;
  /** Expand button to full container width */
  fullWidth?: boolean;
}

// ── Style maps ────────────────────────────────────────────

const sizeClasses: Record<PrimaryButtonSize, string> = {
  sm: 'h-8  px-3.5 text-xs  gap-1.5',
  md: 'h-10 px-5   text-sm  gap-2',
  lg: 'h-12 px-7   text-base gap-2.5',
};

const variantClasses: Record<PrimaryButtonVariant, string> = {
  solid: [
    'bg-brand-600 text-white',
    'hover:bg-brand-500 active:bg-brand-700',
    'shadow-glow-xs hover:shadow-glow-sm',
  ].join(' '),
  gradient: [
    'bg-gradient-to-r from-brand-600 to-accent-600 text-white',
    'hover:from-brand-500 hover:to-accent-500',
    'shadow-glow-xs hover:shadow-glow-sm',
  ].join(' '),
};

// ── Component ─────────────────────────────────────────────

/**
 * PrimaryButton — high-emphasis call-to-action button.
 *
 * @example
 * <PrimaryButton>Submit Incident</PrimaryButton>
 * <PrimaryButton variant="gradient" size="lg" loading>Processing…</PrimaryButton>
 * <PrimaryButton leftIcon={<Icon />} fullWidth>Submit</PrimaryButton>
 */
export function PrimaryButton({
  size     = 'md',
  loading  = false,
  leftIcon,
  rightIcon,
  variant  = 'solid',
  fullWidth = false,
  children,
  className,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        // base
        'inline-flex items-center justify-center rounded-xl font-semibold',
        'transition-all duration-200 ease-smooth',
        // accessibility focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1',
        // size
        sizeClasses[size],
        // variant
        variantClasses[variant],
        // disabled / loading states
        isDisabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'cursor-pointer',
        // width
        fullWidth && 'w-full',
        className,
      )}
    >
      {/* Left slot: spinner overrides icon while loading */}
      {loading ? (
        <Spinner size="sm" color="white" />
      ) : (
        leftIcon && (
          <span className="flex-shrink-0 flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}

      <span>{children}</span>

      {/* Right icon — hidden while loading */}
      {!loading && rightIcon && (
        <span className="flex-shrink-0 flex items-center" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
