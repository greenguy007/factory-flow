import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  to: string;
  variant: 'warning' | 'info' | 'success' | 'process';
}

export function DashboardCard({ title, count, icon: Icon, to, variant }: DashboardCardProps) {
  const variantClasses = {
    warning: 'border-l-dashboard-warning bg-dashboard-warning-bg',
    info: 'border-l-dashboard-info bg-dashboard-info-bg',
    success: 'border-l-dashboard-success bg-dashboard-success-bg',
    process: 'border-l-dashboard-process bg-dashboard-process-bg',
  };

  const iconClasses = {
    warning: 'text-dashboard-warning',
    info: 'text-dashboard-info',
    success: 'text-dashboard-success',
    process: 'text-dashboard-process',
  };

  return (
    <Link
      to={to}
      className={`block p-6 rounded-lg border-l-4 transition-all hover:shadow-md ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-4xl font-bold text-foreground">{count}</p>
        </div>
        <Icon className={`h-10 w-10 ${iconClasses[variant]}`} />
      </div>
    </Link>
  );
}
