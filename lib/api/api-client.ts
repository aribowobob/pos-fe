import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { devLog } from '../utils';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle cookies
apiClient.interceptors.request.use(config => {
  // Set withCredentials to true to send cookies with every request
  // This is crucial for HTTP-only cookies to be included with requests
  config.withCredentials = true;

  // We don't need to manually add Authorization header
  // since HTTP-only cookie will be sent automatically by the browser
  // and the backend will extract the token from the cookie

  return config;
});

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // Handle expired tokens, unauthorized access, etc.
    if (error.response?.status === 401) {
      devLog('[API Client] Received 401 Unauthorized error');

      // No need to manually clear cookies - they are HTTP-only from server
      // We'll use the logout endpoint to clear cookies on unauthorized access
      devLog('[API Client] Calling logout endpoint to clear HTTP-only cookies');
      apiClient.post('/auth/logout', {}).catch(() => {
        // Silently ignore errors from logout endpoint
      });

      // Let middleware handle redirects instead of forcing it here
      // This avoids competing redirects with React components
      devLog(
        '[API Client] Token cleared, will rely on middleware for redirect'
      );
    }
    return Promise.reject(error);
  }
);

export async function getData<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.get<T>(url, options);
  return response.data;
}

export async function postData<T, D = unknown>(
  url: string,
  data?: D,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<T>(url, data, options);
  return response.data;
}

export async function putData<T, D = unknown>(
  url: string,
  data?: D,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<T>(url, data, options);
  return response.data;
}

export async function deleteData<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.delete<T>(url, options);
  return response.data;
}

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || 'Terjadi kesalahan'
    );
  }
  return 'Terjadi kesalahan tidak terduga';
}
