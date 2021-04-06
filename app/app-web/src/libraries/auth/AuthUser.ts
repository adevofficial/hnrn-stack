export interface AuthUser {
  id: string;
  display_name: string;
  email: string;
}

export type AuthUserType = AuthUser | null;
