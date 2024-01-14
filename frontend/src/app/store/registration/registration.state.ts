import { Roles } from '../../models/user/roles';

export interface RegistrationState {
  isLoading: boolean;
  currentStep: number;
  basicInfo: BasicInfo | null;
  credentials: Credentials | null;
}

export interface BasicInfo {
  firstName: string;
  lastName: string;
  phone: string; address?: string;
  city?: string;
  zip?: number;
}

export interface Credentials {
  email: string;
  password: string;
  role: Roles;
}

export type RegisterUser = BasicInfo & Credentials;
