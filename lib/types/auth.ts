export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  data: {
    cookie_enabled: boolean;
    token: string;
  };
  message: string;
  status: string;
}

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

export interface GoogleLoginPayload {
  token: string;
}
