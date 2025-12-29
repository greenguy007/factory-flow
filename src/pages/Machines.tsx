import { Truck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { ImagePreview } from '@/components/ImagePreview';
import { useInventory } from '@/context/InventoryContext';

export default function Machines() {
  const { machines, getReadyMachinesCount, getMachineImage } = useInventory();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Completed Machines</h2>
          <p className="text-muted-foreground mt-1">Machines ready for shipment</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="mb-6 p-6 bg-dashboard-success-bg rounded-lg border-l-4 border-l-dashboard-success inline-flex items-center gap-4">
        <Truck className="h-10 w-10 text-dashboard-success" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Machines Ready</p>
          <p className="text-3xl font-bold text-foreground">{getReadyMachinesCount()}</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base w-16">Image</TableHead>
              <TableHead className="text-base">Machine ID</TableHead>
              <TableHead className="text-base">Machine Name</TableHead>
              <TableHead className="text-base">Date Manufactured</TableHead>
              <TableHead className="text-base">Order ID</TableHead>
              <TableHead className="text-base text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No machines ready for shipment yet
                </TableCell>
              </TableRow>
            ) : (
              machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell>
                    <ImagePreview 
                      src={machine.image || getMachineImage(machine.name)} 
                      alt={machine.name} 
                    />
                  </TableCell>
                  <TableCell className="font-medium text-base">{machine.id}</TableCell>
                  <TableCell className="text-base">{machine.name}</TableCell>
                  <TableCell className="text-base">{formatDate(machine.dateManufactured)}</TableCell>
                  <TableCell className="text-base">{machine.orderId}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={machine.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
