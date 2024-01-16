export interface OrderModel {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  orderDate: Date;
  // Dodajte ostale potrebne atribute...
}

export interface OrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export enum OrderStatus {
  New = 'new',
  Processed = 'processed',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled'
}
