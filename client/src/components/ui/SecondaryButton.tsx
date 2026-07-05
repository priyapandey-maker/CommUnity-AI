import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

// ── Types ─────────────────────────────────────────────────

export type SecondaryButtonSize = 'sm' | 'md' | 'lg';

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Height / padding / font-size preset */
  size?: SecondaryButtonSize;
  /** Show spinner and disable interactions while true */
  loading?: boolean;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Expand button to full container width */
  fullWidth?: boolean;
}

// ── Style maps ────────────────────────────────────────────

const sizeClasses: Record<SecondaryButtonSize, string> = {
  sm: 'h-8  px-3.5 text-xs  gap-1.5',
  md: 'h-10 px-5   text-sm  gap-2',
  lg: 'h-12 px-7   text-base gap-2.5',
};

// ── Component ─────────────────────────────────────────────

/**
 * SecondaryButton — medium-emphasis outlined button.
 *
 * Pairs visually with PrimaryButton for action groups.
 *
 * @example
 * <SecondaryButton>Cancel</SecondaryButton>
 * <SecondaryButton size="lg" loading>Saving…</SecondaryButton>
 */
export function SecondaryButton({
  size      = 'md',
  loading   = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...rest
}: SecondaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        // base
        'inline-flex items-center justify-center rounded-xl font-semibold',
        // colours — outlined / ghost style
        'border border-line-strong text-slate-300 bg-transparent',
        'hover:border-brand-500 hover:text-brand-300 hover:bg-brand-950/30',
        'active:bg-brand-950/50 active:border-brand-600',
        // transitions
        'transition-all duration-200 ease-smooth',
        // accessibility focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1',
        // size
        sizeClasses[size],
        // disabled / loading states
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        // width
        fullWidth && 'w-full',
        className,
      )}
    >
      {loading ? (
        <Spinner size="sm" color="primary" />
      ) : (
        leftIcon && (
          <span className="flex-shrink-0 flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}

      <span>{children}</span>

      {!loading && rightIcon && (
        <span className="flex-shrink-0 flex items-center" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
