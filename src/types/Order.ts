import OrderItem from './OrderItem';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  BANK_TRANSFER = 'bank_transfer',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

type Order = {
  id: string;
  code: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  items: OrderItem[];
  createdAt: number;
  updatedAt: number;
  status: OrderStatus;
};

export default Order;
