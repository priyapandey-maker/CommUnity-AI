import type { ReactNode, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────

export type PageContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface PageContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Tailwind max-width breakpoint applied to the container */
  maxWidth?: PageContainerMaxWidth;
  /** Horizontally centre the container with mx-auto */
  centered?: boolean;
  /** Render as a different HTML element (e.g. main, section) */
  as?: ElementType;
}

// ── Style maps ────────────────────────────────────────────

const maxWidthClasses: Record<PageContainerMaxWidth, string> = {
  sm:   'max-w-screen-sm',
  md:   'max-w-screen-md',
  lg:   'max-w-screen-lg',
  xl:   'max-w-screen-xl',
  '2xl':'max-w-screen-2xl',
  full: 'max-w-full',
};

// ── Component ─────────────────────────────────────────────

/**
 * PageContainer — responsive layout wrapper with consistent horizontal padding.
 *
 * @example
 * <PageContainer as="main">…page content…</PageContainer>
 * <PageContainer maxWidth="lg" centered={false}>…narrow section…</PageContainer>
 */
export function PageContainer({
  children,
  maxWidth = 'xl',
  centered = true,
  as: Component = 'div',
  className,
  ...rest
}: PageContainerProps) {
  return (
    <Component
      {...rest}
      className={cn(
        'w-full px-4 sm:px-6 lg:px-8',
        maxWidthClasses[maxWidth],
        centered && 'mx-auto',
        className,
      )}
    >
      {children}
    </Component>
  );
}
