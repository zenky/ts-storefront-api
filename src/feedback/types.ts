import { Phone, PhoneRequest, RecaptchaRequest } from "../types.ts";

export interface Feedback {
  id: string;
  name: string | null;
  email: string | null;
  phone: Phone | null;
  comment: string | null;
  created_at: string;
}

export interface FeedbackRequest extends RecaptchaRequest {
  name?: string;
  email?: string;
  phone?: PhoneRequest;
  comment?: string;
}

export interface CallbackRequest extends RecaptchaRequest {
  phone: PhoneRequest;
}
