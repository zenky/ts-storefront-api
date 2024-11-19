import { PhoneRequest, RecaptchaRequest } from "../types.ts";
import {Gender} from "../customers/types.ts";

export enum ConfirmationMethod {
  Sms = 'sms',
  Call = 'call',
}

export interface AbstractRegistrationRequest {
  phone: PhoneRequest;
  password?: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
}

export interface RegistrationRequest extends AbstractRegistrationRequest, RecaptchaRequest {
  referrer_code?: string;
  referrer_id?: string;
}

export interface ConfirmRegistrationRequest extends AbstractRegistrationRequest {
  code: string | number;
}

export interface AuthConfirmationStatus {
  confirmation_required: boolean;
  queued_to: string;
  method: ConfirmationMethod;
}

export interface AuthResult {
  token: string;
}

export interface ResendAuthConfirmationRequest extends RecaptchaRequest {
  phone: PhoneRequest;
}

export interface DispatchPasswordResetRequest extends RecaptchaRequest {
  phone: PhoneRequest;
}

export interface ResetPasswordRequest {
  phone: PhoneRequest;
  code: string | number;
  password: string;
}

export interface LoginRequest {
  phone: PhoneRequest;
  password: string;
}

export interface CheckPhoneRequest {
  phone: PhoneRequest;
}

export interface PhoneCheckResult {
  registered: boolean;
  confirmed: boolean;
}

export interface AuthenticationModalProvider {
  initAuthenticationModal: () => Promise<boolean>;
  destroyAuthenticationModal: () => void;
}
