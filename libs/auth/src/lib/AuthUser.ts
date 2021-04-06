import { User } from '@hnrn-stack/hbp-sdk';

export interface AuthUser {
  id: string;
  display_name: string;
  email: string;
}

export type AuthUserType = User | null;
