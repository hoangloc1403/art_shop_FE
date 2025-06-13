import Product from './Product';

type CartItem = {
  id: string;
  artwork: Product;
  quantity: number;
  price: number;
  createdAt: number;
  updatedAt: number;
};

export default CartItem;
