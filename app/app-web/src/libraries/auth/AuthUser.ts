export interface AuthUser {
  display_name: string;
  email: string;
}

export type AuthUserType = AuthUser | null;
