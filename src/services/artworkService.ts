import { ApiResponse, Product } from '@/types';
import { api } from './api';

const ARTWORK_URL = '/artwork';

const getArtworks = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>(ARTWORK_URL);
  return response.data;
};

const getArtwork = async (id: string | undefined): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`${ARTWORK_URL}/${id}`);
  return response.data;
};

const createArtwork = async (artworkData: any) => {
  return await api.post(ARTWORK_URL, artworkData);
};

const updateArtwork = async (id: string, artworkData: any) => {
  return await api.put(`${ARTWORK_URL}/${id}`, artworkData);
};

const deleteArtwork = async (id: string) => {
  return await api.delete(`${ARTWORK_URL}/${id}`);
};

export const artworkService = {
  getArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
};
