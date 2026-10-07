export interface OrderStatusKind {
  Pending: 'pending';
  AwaitingPayment: 'awaiting_payment';
  Submitted: 'submitted';
  Exported: 'exported';
  Packing: 'packing';
  Ready: 'ready';
  AwaitingDelivery: 'awaiting_delivery';
  Delivering: 'delivering';
  Delivered: 'delivered';
  Rejected: 'rejected';
  Cancelled: 'cancelled';
  Completed: 'completed';
  Custom: 'custom';
}

export interface OrderStatus {
  id: string;
  kind: OrderStatusKind;
  name: string | null;
}

export interface OrderStatusChange extends OrderStatus {
  transitioned_at: string;
}

export interface OrderStatusProgress extends OrderStatus {
  transitioned_at: string | null;
}
