import { api } from '../api';
import { LoginPayload } from './types';
import { LoginResponse } from './types/loginResponse';

const AUTH_URL = '/auth';

const login = async (data: LoginPayload): Promise<LoginResponse> => {
  return api.post(`${AUTH_URL}/login`, data);
};

export const authService = {
  login,
};
