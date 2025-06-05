import { ApiResponse, Order } from '@/types';
import { api } from './api';

const ORDER_URL = '/orders';

const getOrdersByUser = async (): Promise<Order[]> => {
  const response = await api.get<ApiResponse<Order[]>>(ORDER_URL);
  return response.data;
};

const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<ApiResponse<Order[]>>(ORDER_URL);
  return response.data;
};

const getOrder = async (id: string | undefined): Promise<Order> => {
  const response = await api.get<ApiResponse<Order>>(`${ORDER_URL}/${id}`);
  return response.data;
};

const createOrder = async (orderData: any) => {
  return await api.post(ORDER_URL, orderData);
};

const updateOrder = async (id: string, orderData: any) => {
  return await api.put(`${ORDER_URL}/${id}`, orderData);
};

const deleteOrder = async (id: string) => {
  return await api.delete(`${ORDER_URL}/${id}`);
};

export const orderService = { getOrdersByUser, getOrders, getOrder, createOrder, updateOrder, deleteOrder };
