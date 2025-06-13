import axios, { AxiosRequestConfig } from 'axios';
import { envGet, sessionStorageGet } from '@/utils';
import { enqueueSnackbar } from 'notistack';

export const API_BASE_URL = envGet('VITE_API_URL', true);
export const API_VERSION = '/v1';
export const FULL_API_URL = API_BASE_URL + API_VERSION;

/**
 * Build a full API URL with a given endpoint
 * @param {string} endpoint - The API endpoint to append
 * @returns {string} - The full API URL
 */
export function buildApiUrl(endpoint: string): string {
  return `${FULL_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

// Khởi tạo axios instance
const apiInstance = axios.create({
  baseURL: FULL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout sau 10s
});

// 🛠 Thêm interceptor để tự động gắn token vào headers
apiInstance.interceptors.request.use((config) => {
  const token = sessionStorageGet('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      enqueueSnackbar('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');

      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('avatar_url');
      sessionStorage.removeItem('fullName');

      setTimeout(() => {
        window.location.href = '/sign_in';
      }, 1500);
    }

    return Promise.reject(error);
  }
);

/**
 * Perform a request using axios
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} endpoint - API endpoint
 * @param {any} [data] - Payload (for POST, PUT, etc.)
 * @param {AxiosRequestConfig} [config] - Optional axios config
 * @returns {Promise<any>} - The API response
 */
async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  try {
    const url = buildApiUrl(endpoint);
    const response = await apiInstance.request({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig) =>
    apiRequest('GET', endpoint, undefined, config) as Promise<T>,
  post: <T = any>(endpoint: string, data: any, config?: AxiosRequestConfig) =>
    apiRequest('POST', endpoint, data, config) as Promise<T>,
  put: <T = any>(endpoint: string, data: any, config?: AxiosRequestConfig) =>
    apiRequest('PUT', endpoint, data, config) as Promise<T>,
  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig) =>
    apiRequest('DELETE', endpoint, undefined, config) as Promise<T>,
};
