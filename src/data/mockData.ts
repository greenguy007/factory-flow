import { Part, Order, Machine } from '@/types/inventory';

export const initialParts: Part[] = [
  { id: '1', name: 'Load Cell 50kg', category: 'Part', availableQuantity: 25, minimumQuantity: 10 },
  { id: '2', name: 'Load Cell 100kg', category: 'Part', availableQuantity: 8, minimumQuantity: 10 },
  { id: '3', name: 'Digital Display Unit', category: 'Part', availableQuantity: 15, minimumQuantity: 5 },
  { id: '4', name: 'Steel Platform 30x30', category: 'Part', availableQuantity: 12, minimumQuantity: 8 },
  { id: '5', name: 'Steel Platform 50x50', category: 'Part', availableQuantity: 6, minimumQuantity: 5 },
  { id: '6', name: 'Power Supply Unit', category: 'Part', availableQuantity: 20, minimumQuantity: 10 },
  { id: '7', name: 'Connecting Cable 2m', category: 'Spare', availableQuantity: 50, minimumQuantity: 20 },
  { id: '8', name: 'Rubber Feet Set', category: 'Spare', availableQuantity: 3, minimumQuantity: 15 },
  { id: '9', name: 'Calibration Weight 1kg', category: 'Spare', availableQuantity: 10, minimumQuantity: 5 },
  { id: '10', name: 'Junction Box', category: 'Part', availableQuantity: 18, minimumQuantity: 8 },
];

export const initialOrders: Order[] = [
  { id: 'ORD-001', machineName: 'Platform Scale 50kg', quantityOrdered: 5, dueDate: '2025-01-15', status: 'In Process', createdAt: '2024-12-20' },
  { id: 'ORD-002', machineName: 'Bench Scale 30kg', quantityOrdered: 10, dueDate: '2025-01-10', status: 'Pending', createdAt: '2024-12-22' },
  { id: 'ORD-003', machineName: 'Floor Scale 500kg', quantityOrdered: 2, dueDate: '2024-12-25', status: 'Delayed', createdAt: '2024-12-15' },
  { id: 'ORD-004', machineName: 'Counting Scale 6kg', quantityOrdered: 8, dueDate: '2025-01-20', status: 'Pending', createdAt: '2024-12-28' },
  { id: 'ORD-005', machineName: 'Platform Scale 100kg', quantityOrdered: 3, dueDate: '2025-01-05', status: 'Completed', createdAt: '2024-12-10' },
];

export const initialMachines: Machine[] = [
  { id: 'M-001', name: 'Platform Scale 100kg', dateManufactured: '2024-12-28', status: 'Ready', orderId: 'ORD-005' },
  { id: 'M-002', name: 'Platform Scale 100kg', dateManufactured: '2024-12-28', status: 'Ready', orderId: 'ORD-005' },
  { id: 'M-003', name: 'Platform Scale 100kg', dateManufactured: '2024-12-29', status: 'Ready', orderId: 'ORD-005' },
  { id: 'M-004', name: 'Bench Scale 15kg', dateManufactured: '2024-12-27', status: 'Ready', orderId: 'ORD-006' },
  { id: 'M-005', name: 'Counting Scale 3kg', dateManufactured: '2024-12-26', status: 'Ready', orderId: 'ORD-007' },
];

export const machineModels = [
  'Platform Scale 50kg',
  'Platform Scale 100kg',
  'Platform Scale 200kg',
  'Bench Scale 15kg',
  'Bench Scale 30kg',
  'Floor Scale 500kg',
  'Floor Scale 1000kg',
  'Counting Scale 3kg',
  'Counting Scale 6kg',
  'Counting Scale 15kg',
];

export const partCategories = ['Part', 'Spare'] as const;

// Machine images mapping - can be updated when actual images are available
export const machineImages: Record<string, string> = {};
