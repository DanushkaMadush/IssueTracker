import apiClient from "../client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", data);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};