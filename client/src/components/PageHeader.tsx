import { Badge } from './ui/Badge';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {badge && (
        <div className="mb-3">
          <Badge variant="primary">
            {badge}
          </Badge>
        </div>
      )}
      <h1
        className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-2 text-base max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
