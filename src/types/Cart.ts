import CartItem from './CartItem';

type Cart = {
  id: string;
  totalPrice: number;
  items: CartItem[];
  createdAt: number;
  updatedAt: number;
};

export default Cart;
