import { ApiResponse, Cart } from '@/types';
import { api } from './api';

const CART_URL = '/cart';

// Get the current user's cart
const getCart = async (): Promise<Cart> => {
  const response = await api.get<ApiResponse<Cart>>(CART_URL);
  return response.data;
};

// Add an artwork to the cart
const addToCart = async (data: { artworkId: string; quantity: number }): Promise<Cart> => {
  const response = await api.post<ApiResponse<Cart>>(`${CART_URL}/items`, data);
  return response.data;
};

// Remove a specific item from the cart
const removeCartItem = async (itemId: string): Promise<Cart> => {
  const response = await api.delete<ApiResponse<Cart>>(`${CART_URL}/items/${itemId}`);
  return response.data;
};

// Clear all items in the cart
const clearCart = async (): Promise<Cart> => {
  const response = await api.delete<ApiResponse<Cart>>(`${CART_URL}/items`);
  return response.data;
};

export const cartService = {
  getCart,
  addToCart,
  removeCartItem,
  clearCart,
};
