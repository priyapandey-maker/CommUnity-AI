import type { ReactNode, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export type CardVariant = 'default' | 'glass' | 'bordered' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Visual style of the card surface */
  variant?: CardVariant;
  /** Internal padding preset */
  padding?: CardPadding;
  /** Render as a different HTML element (e.g. article, section, li) */
  as?: ElementType;
}

// ── Style maps ────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  default:  'bg-surface-1 border border-line shadow-card dark:shadow-card-dark',
  glass:    'glass',
  bordered: 'bg-surface-1 border-2 border-line-strong',
  elevated: 'bg-surface-2 border border-line shadow-card dark:shadow-card-dark',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
};

// ── Component ─────────────────────────────────────────────

/**
 * Card — content container with four surface styles.
 * All variants adapt to light and dark themes automatically.
 *
 * @example
 * <Card>Simple card</Card>
 * <Card variant="glass" padding="lg">Frosted panel</Card>
 * <Card as="article" variant="elevated" padding="sm">Elevated article</Card>
 */
export function Card({
  children,
  variant  = 'default',
  padding  = 'md',
  as: Component = 'div',
  className,
  ...rest
}: CardProps) {
  return (
    <Component
      {...rest}
      className={cn(
        'rounded-xl',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
