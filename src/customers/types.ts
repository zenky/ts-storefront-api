import {Phone} from "../types.ts";
import {BonusesLevel, LoyaltyRates} from "../loyalty/types.ts";
import {Media} from "../media/types.ts";
import {DadataDeliveryAddressRequest, ManualDeliveryAddressRequest} from "../addresses/types.ts";

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface CustomerLoyaltyProfile {
  referral_program: {
    code: string;
    join_url: string;
    invite_url: string;
  };
  balance: number | null;
  bonuses_level: BonusesLevel | null;
  rates: LoyaltyRates | null;
}

export interface CustomerSettings {
  onesignal_id: string | null;
  device_id: string | null;
  device_token: string | null;
  device_os: string | null;
  barcode: string | null;
  qrcode: string | null;
}

export interface Customer {
  id: string;
  store_profile_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: Phone;
  gender: Gender;
  birth_date: string | null;
  registered_at: string;
  loyalty: CustomerLoyaltyProfile | null;
  settings?: CustomerSettings;
  avatar?: Media | null;
}

export interface UpdateCustomerProfileRequest {
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
  password?: string;
  current_password?: string;
}

export interface RemoveCustomerProfileRequest {
  password: string;
}

export interface UpdateCustomerSettingsRequest {
  onesignal_id?: string;
  device_id?: string;
  device_token?: string;
  device_os?: string;
  barcode?: string;
  qrcode?: string;
}

export interface DeliveryAddressRequest {
  delivery_address: DadataDeliveryAddressRequest | ManualDeliveryAddressRequest;
}

export enum AcquiringType {
  CloudPayments = 'cloudpayments',
}

export enum PaymentSystemType {
  Visa = 'visa',
  MasterCard = 'master-card',
  MIR = 'mir',
  Maestro = 'maestro',
  AmericanExpress = 'american-express',
  DinersClub = 'diners-club',
  Discover = 'discover',
  JCB = 'jcb',
  UnionPay = 'union-pay',
}

export interface PaymentSystem {
  id: PaymentSystemType;
  name: string;
  logos: {
    black: string | null;
    white: string | null;
    colored: string | null;
  };
}

export interface BankInfo {
  id: string;
  name: string;
  url: string;
  background_colors: string[];
  primary_background_color: string;
  background_style: 'dark' | 'white';
  logo_style: 'dark' | 'white';
  text_color: string;
  logos: {
    png: string | null;
    svg: string | null;
  };
  payment_system: PaymentSystem;
}

export interface CustomerPaymentMethod {
  id: string;
  acquiring_type: AcquiringType;
  card_type: PaymentSystemType;
  card_first_six: string;
  card_last_four: string;
  name: string;
  bank: BankInfo | null;
}

export interface ResolverBonusesBalance {
  balance: number | null;
  resolved_by: string;
}
