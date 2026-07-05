/**
 * cn — Class Name Utility
 *
 * Merges Tailwind class strings, filtering out falsy values produced by
 * conditional expressions such as `condition && 'class-name'`.
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', className)
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter((v): v is string => Boolean(v)).join(' ');
}
