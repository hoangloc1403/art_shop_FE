import { ApiResponse, Paging, Product } from '@/types';
import { api } from './api';

const ARTWORK_URL = '/artwork';

type FetchParams = {
  medium?: string;
  dimensions?: string[]; // ["30x30", "60x60"]
  categoryIds?: string[]; // ["1", "2", "3"]
  page?: number;
  limit?: number;
  priceFrom?: number;
  priceTo?: number;
};

export const getArtworks = async (params: FetchParams = {}): Promise<Paging<Product>> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (Array.isArray(val)) {
      val.forEach((v) => {
        if (v !== '') searchParams.append(key, String(v));
      });
    } else {
      if (val !== '') searchParams.set(key, String(val));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `${ARTWORK_URL}?${queryString}` : ARTWORK_URL;

  const response = await api.get(url);

  return response.data as Paging<Product>;
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

const uploadImage = async (formData: FormData) => {
  return await api.post(`${ARTWORK_URL}/upload_image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const artworkService = {
  getArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  uploadImage,
};
