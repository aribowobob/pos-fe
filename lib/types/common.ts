/**
 * Common type definitions used across the application
 */

/**
 * Base response structure for API responses
 */
export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * Pagination metadata for paginated responses
 */
export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> extends APIResponse<T> {
  meta: PaginationMeta;
}
