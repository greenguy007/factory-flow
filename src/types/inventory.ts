export interface Part {
  id: string;
  name: string;
  category: 'Part' | 'Spare';
  availableQuantity: number;
  minimumQuantity: number;
  image?: string;
}

export type OrderStatus = 'Pending' | 'In Process' | 'Completed' | 'Delayed';

export interface Order {
  id: string;
  machineName: string;
  quantityOrdered: number;
  dueDate: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Machine {
  id: string;
  name: string;
  dateManufactured: string;
  status: 'Ready';
  orderId: string;
  image?: string;
}

export type PartStatus = 'OK' | 'Low';

export function getPartStatus(part: Part): PartStatus {
  return part.availableQuantity < part.minimumQuantity ? 'Low' : 'OK';
}

export function getOrderStatus(order: Order): OrderStatus {
  if (order.status === 'Completed') return 'Completed';
  
  const dueDate = new Date(order.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dueDate < today) return 'Delayed';
  return order.status;
}
