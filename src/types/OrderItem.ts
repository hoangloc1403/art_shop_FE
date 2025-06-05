import Product from './Product';

type OrderItem = {
  id: string;
  artwork: Product;
  quantity: number;
  price: number;
  createdAt: number;
  updatedAt: number;
};

export default OrderItem;
