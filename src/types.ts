export interface Phone {
  number: string;
  country: string;
  national: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Discount {
  difference: number;
  percentage: number;
}

export enum DiscountType {
  Amount = 'amount',
  Percentage = 'percentage',
}

export enum ContactType {
  Email = 'email',
  Website = 'website',
  Vk = 'vk',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Twitter = 'twitter',
  Ok = 'ok',
  Tiktok = 'tiktok',
}

export interface Contact {
  type: ContactType;
  value: string;
}

export interface ScheduleDay {
  hours: string;
}

export enum TernaryFilter {
  Yes = 'yes',
  No = 'no',
  Both = 'both',
}

export interface Schedule {
  is_open_now: boolean;
  opening_at: string | null;
  closing_at: string | null;
  day_id: string;
  days: {
    monday: ScheduleDay | null;
    tuesday: ScheduleDay | null;
    wednesday: ScheduleDay | null;
    thursday: ScheduleDay | null;
    friday: ScheduleDay | null;
    saturday: ScheduleDay | null;
    sunday: ScheduleDay | null;
  };
}

export interface ApiError {
  message: string;
  original_message: string;
  http_code: number;
  error_code: string;
  meta: any;
}

export enum OrderAuthenticationMethod {
  Disabled = 'disabled',
  Preauth = 'preauth',
  Confirmation = 'confirmation',
}

export enum AddressesProvider {
  Dadata = 'dadata',
  Manual = 'manual',
}

export enum RecaptchaAction {
  Registration = 'registration',
  ResendRegistrationCode = 'resend_registration_code',
  ResetPassword = 'reset_password',
  OrderSubmission = 'order_submission',
  FeedbackRequest = 'feedback_request',
  CallbackRequest = 'callback_request',
}

export interface PhoneRequest {
  number: string;
  country: string;
}

export interface RecaptchaRequest {
  recaptcha?: {
    token: string;
  };
}
