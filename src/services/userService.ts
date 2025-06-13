import { ApiResponse, User } from '@/types';
import { api } from './api';

const USER_URL = '/user';

const getProfile = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>(`${USER_URL}/profile`);
  return response.data;
};

const updateProfile = async (data: { fullName: string; phoneNumber: string; address: string }) => {
  return await api.post(`${USER_URL}/profile`, data);
};

const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  return await api.post(`${USER_URL}/profile/change-password`, data);
};

export const userService = {
  getProfile,
  updateProfile,
  changePassword,
};
