import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = getCookie('auth-token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle expired tokens, unauthorized access, etc.
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export async function fetchData<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, options);
  return response.data;
}

export async function postData<T, D = any>(url: string, data?: D, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.post<T>(url, data, options);
  return response.data;
}

export async function putData<T, D = any>(url: string, data?: D, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.put<T>(url, data, options);
  return response.data;
}

export async function deleteData<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, options);
  return response.data;
}

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
}
