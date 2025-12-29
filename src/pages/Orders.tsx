import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { useInventory } from '@/context/InventoryContext';
import { getOrderStatus, Order, OrderStatus } from '@/types/inventory';
import { machineModels } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const orderStatuses: OrderStatus[] = ['Pending', 'In Process', 'Completed', 'Delayed'];

export default function Orders() {
  const { orders, addOrder, updateOrderStatus } = useInventory();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [newOrder, setNewOrder] = useState({
    machineName: '',
    quantityOrdered: 1,
    dueDate: '',
    status: 'Pending' as OrderStatus,
  });

  const [newStatus, setNewStatus] = useState<OrderStatus>('Pending');

  const handleAddOrder = () => {
    if (!newOrder.machineName) {
      toast({ title: 'Error', description: 'Please select a machine', variant: 'destructive' });
      return;
    }
    if (!newOrder.dueDate) {
      toast({ title: 'Error', description: 'Please select a due date', variant: 'destructive' });
      return;
    }
    addOrder(newOrder);
    setNewOrder({ machineName: '', quantityOrdered: 1, dueDate: '', status: 'Pending' });
    setIsAddOpen(false);
    toast({ title: 'Success', description: 'Order created successfully' });
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus);
      setIsStatusOpen(false);
      setSelectedOrder(null);
      toast({ title: 'Success', description: 'Order status updated' });
    }
  };

  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusOpen(true);
  };

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
          <h2 className="text-2xl font-semibold text-foreground">Production Orders</h2>
          <p className="text-muted-foreground mt-1">Track and manage production orders</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="machine">Machine Model</Label>
                <Select
                  value={newOrder.machineName}
                  onValueChange={(value) => setNewOrder({ ...newOrder, machineName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select machine model" />
                  </SelectTrigger>
                  <SelectContent>
                    {machineModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={newOrder.quantityOrdered}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, quantityOrdered: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newOrder.dueDate}
                  onChange={(e) => setNewOrder({ ...newOrder, dueDate: e.target.value })}
                />
              </div>
              <Button onClick={handleAddOrder} className="w-full">
                Create Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base">Order ID</TableHead>
              <TableHead className="text-base">Machine Name</TableHead>
              <TableHead className="text-base text-center">Quantity</TableHead>
              <TableHead className="text-base">Due Date</TableHead>
              <TableHead className="text-base text-center">Status</TableHead>
              <TableHead className="text-base text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-base">{order.id}</TableCell>
                <TableCell className="text-base">{order.machineName}</TableCell>
                <TableCell className="text-center text-base">{order.quantityOrdered}</TableCell>
                <TableCell className="text-base">{formatDate(order.dueDate)}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={getOrderStatus(order)} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openStatusDialog(order)}
                    disabled={order.status === 'Completed'}
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Order: <span className="font-medium text-foreground">{selectedOrder.id}</span>
              </p>
              <p className="text-muted-foreground">
                Machine:{' '}
                <span className="font-medium text-foreground">{selectedOrder.machineName}</span>
              </p>
              <div>
                <Label htmlFor="status">New Status</Label>
                <Select value={newStatus} onValueChange={(value: OrderStatus) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateStatus} className="w-full">
                Update Status
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
