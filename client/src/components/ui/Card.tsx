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
  default:  'bg-surface-2 border border-line',
  glass:    'glass',
  bordered: 'bg-surface-2 border-2 border-line-strong',
  elevated: 'bg-surface-3 border border-line shadow-card',
};

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

// ── Component ─────────────────────────────────────────────

/**
 * Card — content container with four surface styles.
 *
 * @example
 * <Card>Simple card</Card>
 * <Card variant="glass" padding="lg">Glassmorphism panel</Card>
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
        'rounded-2xl',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
