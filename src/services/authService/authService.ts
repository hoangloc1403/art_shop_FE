import { api } from '../api';
import { LoginPayload, SignupPayload } from './types';
import { LoginResponse } from './types/loginResponse';

const AUTH_URL = '/auth';

const login = async (data: LoginPayload): Promise<LoginResponse> => {
  return api.post(`${AUTH_URL}/login`, data);
};

const signup = async (data: SignupPayload) => {
  return api.post(`/user/signup`, data);
};

export const authService = {
  login,
  signup,
};
