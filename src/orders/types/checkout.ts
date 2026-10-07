import { Discount, Phone, PhoneRequest, RecaptchaRequest } from "../../types.ts";
import { Gender } from "../../customers/types.ts";
import { ConfirmationMethod, RequestedConfirmationMethod } from "../../authentication/types.ts";
import { Order } from "./order.ts";
import { OrderCheckoutTotalPayment } from "./payments.ts";

export interface SetOrderCustomerRequest {
  phone?: PhoneRequest;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
}

export interface OrderCheckoutTotal {
  min_price: number | null;
  subtotal: number;
  original_subtotal: number | null;
  delivery_price: number | null;
  delivery_discount: number | null;
  packaging_price?: number | null;
  discount: Discount | null;
  total: number;
  original_total: number | null;
  max_bonuses_payment: number | null;
  cashback: number | null;
  payments: OrderCheckoutTotalPayment[];
}

export interface OrderCheckoutRequest extends RecaptchaRequest {
  notes?: string;
  persons_count?: string | number;
  session_id?: string;
  anonymous_id?: string;
}

export interface OrderCheckoutResult {
  confirmation: {
    required: boolean;
    method: ConfirmationMethod | null;
    phone: Phone | null;
  };
  online_payment: {
    required: boolean;
    payment_page_url: string | null;
    transaction_id: string | null;
  };
  order: Order;
}

export interface ConfirmOrderRequest {
  code: string | number;
}

export interface ResendOrderConfirmationCodeRequest {
  method?: RequestedConfirmationMethod | null;
}

export interface OrderConfirmationCodeResendResult {
  success: boolean;
  method: ConfirmationMethod | null;
}

export interface OrderConfirmationResult {
  success: boolean;
  token: string | null;
}

export enum OrderErrorCode {
  ProductsRestrictionBlocking = 'orders.products.restriction_blocking',
}
