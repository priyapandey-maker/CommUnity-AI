interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {badge && (
        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-900/30 border border-indigo-800/50 rounded-full">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-base text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
