import { createContext, useContext, useState, ReactNode } from 'react';
import { Part, Order, Machine, getPartStatus, getOrderStatus } from '@/types/inventory';
import { initialParts, initialOrders, initialMachines, machineImages } from '@/data/mockData';

interface InventoryContextType {
  parts: Part[];
  orders: Order[];
  machines: Machine[];
  addPart: (part: Omit<Part, 'id'>) => void;
  updatePartStock: (id: string, quantity: number) => void;
  addStock: (id: string, quantity: number) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getLowStockCount: () => number;
  getActiveOrdersCount: () => number;
  getInProcessOrdersCount: () => number;
  getReadyMachinesCount: () => number;
  getMachineImage: (machineName: string) => string | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);

  const addPart = (part: Omit<Part, 'id'>) => {
    const newPart: Part = {
      ...part,
      id: `${Date.now()}`,
    };
    setParts((prev) => [...prev, newPart]);
  };

  const updatePartStock = (id: string, quantity: number) => {
    setParts((prev) =>
      prev.map((part) =>
        part.id === id ? { ...part, availableQuantity: quantity } : part
      )
    );
  };

  const addStock = (id: string, quantity: number) => {
    setParts((prev) =>
      prev.map((part) =>
        part.id === id
          ? { ...part, availableQuantity: part.availableQuantity + quantity }
          : part
      )
    );
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const orderCount = orders.length + 1;
    const newOrder: Order = {
      ...order,
      id: `ORD-${String(orderCount).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    // If order is completed, add machines
    if (status === 'Completed') {
      const order = orders.find((o) => o.id === id);
      if (order) {
        const machineImage = getMachineImage(order.machineName);
        const newMachines: Machine[] = Array.from(
          { length: order.quantityOrdered },
          (_, i) => ({
            id: `M-${Date.now()}-${i}`,
            name: order.machineName,
            dateManufactured: new Date().toISOString().split('T')[0],
            status: 'Ready' as const,
            orderId: id,
            image: machineImage,
          })
        );
        setMachines((prev) => [...prev, ...newMachines]);
      }
    }
  };

  const getLowStockCount = () => {
    return parts.filter((part) => getPartStatus(part) === 'Low').length;
  };

  const getActiveOrdersCount = () => {
    return orders.filter((order) => {
      const status = getOrderStatus(order);
      return status !== 'Completed';
    }).length;
  };

  const getInProcessOrdersCount = () => {
    return orders.filter((order) => order.status === 'In Process').length;
  };

  const getReadyMachinesCount = () => {
    return machines.filter((machine) => machine.status === 'Ready').length;
  };

  const getMachineImage = (machineName: string): string | undefined => {
    return machineImages[machineName];
  };

  return (
    <InventoryContext.Provider
      value={{
        parts,
        orders,
        machines,
        addPart,
        updatePartStock,
        addStock,
        addOrder,
        updateOrderStatus,
        getLowStockCount,
        getActiveOrdersCount,
        getInProcessOrdersCount,
        getReadyMachinesCount,
        getMachineImage,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
