import { PartStatus, OrderStatus } from '@/types/inventory';

interface StatusBadgeProps {
  status: PartStatus | OrderStatus | 'Ready';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case 'OK':
      case 'Completed':
      case 'Ready':
        return 'bg-status-ok-bg text-status-ok';
      case 'Low':
      case 'Delayed':
        return 'bg-status-delayed-bg text-status-delayed';
      case 'Pending':
        return 'bg-status-pending-bg text-status-pending';
      case 'In Process':
        return 'bg-status-process-bg text-status-process';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${getStatusClasses()}`}>
      {status}
    </span>
  );
}
