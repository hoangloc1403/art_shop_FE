import { ApiResponse, Category } from '@/types';
import { api } from './api';

const CATEGORY_URL = '/category';

const getTreeCategories = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>(`${CATEGORY_URL}/tree`);
  return response.data;
};

const getCategory = async (id: string): Promise<Category> => {
  const response = await api.get<ApiResponse<Category>>(`${CATEGORY_URL}/${id}`);
  return response.data;
};

const createCategory = async (categoryData: any) => {
  return await api.post(CATEGORY_URL, categoryData);
};

const updateCategory = async (id: string, categoryData: any) => {
  return await api.put(`${CATEGORY_URL}/${id}`, categoryData);
};

const uploadImage = async (formData: FormData) => {
  return await api.post(`${CATEGORY_URL}/upload_image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const categoryService = {
  getTreeCategories,
  createCategory,
  uploadImage,
  getCategory,
  updateCategory,
};
