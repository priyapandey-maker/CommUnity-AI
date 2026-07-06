import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm border border-transparent',
  secondary:
    'border text-sm font-medium transition-colors focus-ring rounded-lg',
  ghost:
    'bg-transparent text-sm font-medium transition-colors focus-ring rounded-lg',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  style,
  ...props
}: ButtonProps) {
  const isSecondary = variant === 'secondary';
  const isGhost     = variant === 'ghost';

  return (
    <button
      {...props}
      style={{
        ...(isSecondary ? {
          backgroundColor: 'var(--surface-1)',
          borderColor: 'var(--line-strong)',
          color: 'var(--text-primary)',
        } : {}),
        ...(isGhost ? {
          color: 'var(--text-secondary)',
        } : {}),
        ...style,
      }}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' ? variantClasses.primary : '',
        isSecondary || isGhost ? 'hover:opacity-80' : '',
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
