import { API_ENDPOINTS } from "../constants/api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

// Helper to get token from memory
let authToken: string | null = localStorage.getItem("token");

export const getToken = (): string | null => authToken;

export const setToken = (token: string): void => {
  authToken = token;
  localStorage.setItem("token", token); // store for page refresh
};

export const clearToken = (): void => {
  authToken = null;
  localStorage.removeItem("token");
};

// Helper for authenticated headers
export const getAuthHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
});

// Register
export async function register(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return {
    success: data.success,
    token: data.data.token,
    user: {
      id: data.data._id,
      name: data.data.name,
      email: data.data.email,
    },
  };
}

// Login
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return {
    success: data.success,
    token: data.data.token,
    user: {
      id: data.data._id,
      name: data.data.name,
      email: data.data.email,
    },
  };
}