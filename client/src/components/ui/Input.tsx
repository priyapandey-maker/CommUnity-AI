import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the input — links to input via htmlFor/id */
  label?: string;
  /** Error message displayed below; also applies error border colour */
  error?: string;
  /** Helper text shown below (hidden when error is present) */
  hint?: string;
  /** Icon rendered inside the left edge of the input */
  leftIcon?: ReactNode;
  /** Icon rendered inside the right edge of the input */
  rightIcon?: ReactNode;
  /** Expand wrapper and input to fill the container width */
  fullWidth?: boolean;
}

// ── Component ─────────────────────────────────────────────

/**
 * Input — single-line text field with optional label, icons, error, and hint.
 *
 * @example
 * <Input label="Email" placeholder="you@example.com" type="email" id="email" />
 * <Input error="Required" label="Name" id="name" />
 * <Input leftIcon={<SearchIcon />} placeholder="Search…" />
 */
export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  ...rest
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-300 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className="absolute left-3 flex items-center text-slate-500 pointer-events-none"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          {...rest}
          id={id}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${id}-error`
              : hint
              ? `${id}-hint`
              : undefined
          }
          className={cn(
            // base
            'h-10 w-full rounded-xl bg-surface-3 border text-sm text-slate-100',
            'placeholder:text-slate-600',
            'transition-all duration-200 ease-smooth',
            // focus
            'focus:outline-none focus:ring-2',
            // icon padding
            leftIcon  ? 'pl-10' : 'pl-3.5',
            rightIcon ? 'pr-10' : 'pr-3.5',
            // state colours
            hasError
              ? 'border-red-500 focus:ring-red-500/40 focus:border-red-500'
              : 'border-line hover:border-line-strong focus:ring-brand-500/40 focus:border-brand-500',
            // disabled
            rest.disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
        />

        {rightIcon && (
          <span
            className="absolute right-3 flex items-center text-slate-500 pointer-events-none"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {hasError && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
      {!hasError && hint && (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
