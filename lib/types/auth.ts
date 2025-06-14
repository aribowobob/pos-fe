/**
 * Base user information
 */
export interface User {
  id: number;
  email: string;
  full_name: string;
  initial: string;
  company_id: number;
  company_name: string;
}

/**
 * Branch store information assigned to a user
 */
export interface BranchStore {
  id: number;
  name: string;
  initial: string;
}

/**
 * User with associated branch stores
 */
export interface GetCurrentUserRes extends User {
  stores?: BranchStore[];
}

/**
 * User data with selected store
 * Used in application state
 */
export interface UserState extends User {
  stores?: BranchStore[];
  store?: BranchStore;
}

/**
 * Response from authentication endpoint
 */
export interface AuthResponse {
  data: {
    cookie_enabled: boolean;
    token: string;
  };
  message: string;
  status: string;
}

/**
 * Payload for Google login
 */
export interface GoogleLoginPayload {
  token: string;
}
