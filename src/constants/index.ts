export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AppUser {
  username: string;
  token?: string | null;
}

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "todoAuthUser";
export const BASE_URL = "http://localhost:8081";
