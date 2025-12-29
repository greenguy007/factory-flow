import { AlertTriangle, ClipboardList, RefreshCw, Truck } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { useInventory } from '@/context/InventoryContext';

export default function Dashboard() {
  const {
    getLowStockCount,
    getActiveOrdersCount,
    getInProcessOrdersCount,
    getReadyMachinesCount,
  } = useInventory();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of inventory and production status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Low Stock Parts"
          count={getLowStockCount()}
          icon={AlertTriangle}
          to="/parts"
          variant="warning"
        />
        <DashboardCard
          title="Active Orders"
          count={getActiveOrdersCount()}
          icon={ClipboardList}
          to="/orders"
          variant="info"
        />
        <DashboardCard
          title="Orders In Process"
          count={getInProcessOrdersCount()}
          icon={RefreshCw}
          to="/orders"
          variant="process"
        />
        <DashboardCard
          title="Machines Ready"
          count={getReadyMachinesCount()}
          icon={Truck}
          to="/machines"
          variant="success"
        />
      </div>
    </div>
  );
}
