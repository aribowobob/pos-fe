/**
 * Common type definitions used across the application
 */

/**
 * Base response structure for API responses
 */
export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

/**
 * Pagination metadata for paginated responses
 */
export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  total_pages: number;
}

/**
 * Paginated data structure
 */
export interface PaginatedData<T> extends PaginationMeta {
  items: T[];
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  status: string;
  message: string;
  data: PaginatedData<T>;
}

export enum DiscountType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}
