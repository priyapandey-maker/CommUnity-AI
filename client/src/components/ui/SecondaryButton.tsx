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
        'inline-flex items-center justify-center rounded-lg font-semibold',
        // colours — outlined / ghost style
        'border border-line-strong text-secondary bg-transparent',
        'hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50/50 dark:hover:text-primary-300 dark:hover:bg-primary-950/30',
        'active:bg-primary-100/50 active:border-primary-600 dark:active:bg-primary-950/50 dark:active:border-primary-600',
        // transitions
        'transition-all duration-200 ease-smooth',
        // accessibility focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'focus-visible:ring-offset-2',
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
