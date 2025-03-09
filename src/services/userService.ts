import { ApiResponse, User } from '@/types';
import { api } from './api';

const USER_URL = '/user';

const getProfile = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>(`${USER_URL}/profile`);
  return response.data;
};

// const createArtwork = async (artworkData: any) => {
//   return await api.post(ARTWORK_URL, artworkData);
// };

// const updateArtwork = async (id: string, artworkData: any) => {
//   return await api.put(`${ARTWORK_URL}/${id}`, artworkData);
// };

// const deleteArtwork = async (id: string) => {
//   return await api.delete(`${ARTWORK_URL}/${id}`);
// };

export const userService = {
  getProfile,
};
