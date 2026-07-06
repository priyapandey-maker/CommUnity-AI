import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Badge } from './Badge';

// ── Types ─────────────────────────────────────────────────

export type SectionTitleAlign = 'left' | 'center' | 'right';

export interface SectionTitleProps {
  /** Main heading text */
  title: string;
  /** Optional supporting paragraph below the heading */
  subtitle?: string;
  /** Optional small Badge label rendered above the heading */
  badge?: string;
  /** Apply the brand gradient to the heading text */
  gradient?: boolean;
  /** Text alignment of the entire block */
  align?: SectionTitleAlign;
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Extra classes on the h2 element */
  titleClassName?: string;
  /** Additional content rendered below the subtitle */
  children?: ReactNode;
}

// ── Style maps ────────────────────────────────────────────

const alignClasses: Record<SectionTitleAlign, string> = {
  left:   'items-start text-left',
  center: 'items-center text-center',
  right:  'items-end text-right',
};

// ── Component ─────────────────────────────────────────────

/**
 * SectionTitle — semantic heading block for page sections.
 *
 * @example
 * <SectionTitle title="Features" subtitle="What we offer" badge="New" />
 * <SectionTitle title="AI-Powered" gradient align="center" />
 */
export function SectionTitle({
  title,
  subtitle,
  badge,
  gradient       = false,
  align          = 'left',
  className,
  titleClassName,
  children,
}: SectionTitleProps) {
  return (
    <div className={cn('flex flex-col gap-3', alignClasses[align], className)}>
      {badge && (
        <Badge variant="primary" size="sm">
          {badge}
        </Badge>
      )}

      <h2
        className={cn(
          'font-display font-bold text-3xl sm:text-4xl tracking-tight text-primary',
          gradient && 'gradient-text',
          titleClassName,
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-secondary text-base sm:text-lg max-w-prose leading-relaxed">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
