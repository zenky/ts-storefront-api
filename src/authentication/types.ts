import { PhoneRequest, RecaptchaRequest } from "../types.ts";
import { Gender } from "../customers/types.ts";

export enum ConfirmationMethod {
  Sms = 'sms',
  Call = 'call',
  Telegram = 'telegram',
  WhatsApp = 'whatsapp',
}

export type RequestedConfirmationMethod = Exclude<ConfirmationMethod, ConfirmationMethod.Call>;

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
  method?: RequestedConfirmationMethod | null;
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
  method?: RequestedConfirmationMethod | null;
}

export interface DispatchPasswordResetRequest extends RecaptchaRequest {
  phone: PhoneRequest;
  method?: RequestedConfirmationMethod | null;
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

export enum TokenType {
  Storefront = 'storefront',
  Legacy = 'legacy',
}

export interface ExternalAuthInitRequest {
  redirect_url: string;
  token_type?: TokenType;
  scopes?: string;
}

export interface ExternalAuthInitResult {
  store_id: string;
  auth_url: string;
}

export interface ExternalAuthExchangeRequest {
  state: string;
  code: string;
}

export interface ExternalAuthExchangeResult {
  token: string;
}

export type VkAuthInitRequest = ExternalAuthInitRequest;
export type VkAuthInitResult = ExternalAuthInitResult;
export type VkAuthExchangeRequest = ExternalAuthExchangeRequest;
export type VkAuthExchangeResult = ExternalAuthExchangeResult;

export type YandexAuthInitRequest = ExternalAuthInitRequest;
export type YandexAuthInitResult = ExternalAuthInitResult;
export type YandexAuthExchangeRequest = ExternalAuthExchangeRequest;
export type YandexAuthExchangeResult = ExternalAuthExchangeResult;
