import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label rendered above the textarea — links via htmlFor/id */
  label?: string;
  /** Error message displayed below; also applies error border colour */
  error?: string;
  /** Helper text shown below (hidden when error is present) */
  hint?: string;
  /** Expand wrapper and textarea to fill the container width */
  fullWidth?: boolean;
}

// ── Component ─────────────────────────────────────────────

/**
 * Textarea — multi-line text field with optional label, error, and hint.
 *
 * Shares the same design language as Input for visual consistency.
 *
 * @example
 * <Textarea label="Description" placeholder="Describe the incident…" id="desc" rows={5} />
 * <Textarea error="Too short" id="msg" />
 */
export function Textarea({
  label,
  error,
  hint,
  fullWidth = false,
  className,
  id,
  rows = 4,
  ...rest
}: TextareaProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-secondary select-none"
        >
          {label}
        </label>
      )}

      <textarea
        {...rest}
        id={id}
        rows={rows}
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
          'w-full rounded-lg bg-[var(--surface-1)] border border-line text-sm text-primary',
          'placeholder:text-muted/65',
          'px-3.5 py-2.5 resize-y',
          'transition-all duration-200 ease-smooth',
          // focus
          'focus:outline-none focus:ring-2',
          // state colours
          hasError
            ? 'border-red-500 focus:ring-red-500/40 focus:border-red-500'
            : 'border-line hover:border-line-strong focus:ring-primary-500/40 focus:border-primary-500',
          // disabled
          rest.disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      />

      {hasError && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
      {!hasError && hint && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
