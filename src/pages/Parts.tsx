import { useState } from 'react';
import { Plus, PackagePlus } from 'lucide-react';
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
import { getPartStatus, Part } from '@/types/inventory';
import { partCategories } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Parts() {
  const { parts, addPart, updatePartStock, addStock } = useInventory();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const [newPart, setNewPart] = useState({
    name: '',
    category: 'Part' as 'Part' | 'Spare',
    availableQuantity: 0,
    minimumQuantity: 0,
  });

  const [stockQuantity, setStockQuantity] = useState(0);

  const handleAddPart = () => {
    if (!newPart.name.trim()) {
      toast({ title: 'Error', description: 'Part name is required', variant: 'destructive' });
      return;
    }
    addPart(newPart);
    setNewPart({ name: '', category: 'Part', availableQuantity: 0, minimumQuantity: 0 });
    setIsAddOpen(false);
    toast({ title: 'Success', description: 'Part added successfully' });
  };

  const handleUpdateStock = () => {
    if (selectedPart) {
      updatePartStock(selectedPart.id, stockQuantity);
      setIsUpdateOpen(false);
      setSelectedPart(null);
      toast({ title: 'Success', description: 'Stock updated successfully' });
    }
  };

  const handleAddStock = () => {
    if (selectedPart && stockQuantity > 0) {
      addStock(selectedPart.id, stockQuantity);
      setIsAddStockOpen(false);
      setSelectedPart(null);
      setStockQuantity(0);
      toast({ title: 'Success', description: 'Stock added successfully' });
    }
  };

  const openUpdateDialog = (part: Part) => {
    setSelectedPart(part);
    setStockQuantity(part.availableQuantity);
    setIsUpdateOpen(true);
  };

  const openAddStockDialog = (part: Part) => {
    setSelectedPart(part);
    setStockQuantity(0);
    setIsAddStockOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Parts & Spares</h2>
          <p className="text-muted-foreground mt-1">Manage parts and spare inventory</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add New Part
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Part</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Part Name</Label>
                <Input
                  id="name"
                  value={newPart.name}
                  onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                  placeholder="Enter part name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newPart.category}
                  onValueChange={(value: 'Part' | 'Spare') =>
                    setNewPart({ ...newPart, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {partCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availableQty">Available Quantity</Label>
                <Input
                  id="availableQty"
                  type="number"
                  min={0}
                  value={newPart.availableQuantity}
                  onChange={(e) =>
                    setNewPart({ ...newPart, availableQuantity: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="minQty">Minimum Quantity</Label>
                <Input
                  id="minQty"
                  type="number"
                  min={0}
                  value={newPart.minimumQuantity}
                  onChange={(e) =>
                    setNewPart({ ...newPart, minimumQuantity: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <Button onClick={handleAddPart} className="w-full">
                Add Part
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base">Part Name</TableHead>
              <TableHead className="text-base">Category</TableHead>
              <TableHead className="text-base text-center">Available</TableHead>
              <TableHead className="text-base text-center">Minimum</TableHead>
              <TableHead className="text-base text-center">Status</TableHead>
              <TableHead className="text-base text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell className="font-medium text-base">{part.name}</TableCell>
                <TableCell className="text-base">{part.category}</TableCell>
                <TableCell className="text-center text-base">{part.availableQuantity}</TableCell>
                <TableCell className="text-center text-base">{part.minimumQuantity}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={getPartStatus(part)} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUpdateDialog(part)}
                    >
                      Update Stock
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-1"
                      onClick={() => openAddStockDialog(part)}
                    >
                      <PackagePlus className="h-4 w-4" />
                      Add Stock
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Stock Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock Quantity</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Part: <span className="font-medium text-foreground">{selectedPart.name}</span>
              </p>
              <div>
                <Label htmlFor="newQty">New Quantity</Label>
                <Input
                  id="newQty"
                  type="number"
                  min={0}
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              <Button onClick={handleUpdateStock} className="w-full">
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Stock Dialog */}
      <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Incoming Stock</DialogTitle>
          </DialogHeader>
          {selectedPart && (
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Part: <span className="font-medium text-foreground">{selectedPart.name}</span>
              </p>
              <p className="text-muted-foreground">
                Current Quantity:{' '}
                <span className="font-medium text-foreground">{selectedPart.availableQuantity}</span>
              </p>
              <div>
                <Label htmlFor="addQty">Quantity to Add</Label>
                <Input
                  id="addQty"
                  type="number"
                  min={1}
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              <Button onClick={handleAddStock} className="w-full">
                Add Stock
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
