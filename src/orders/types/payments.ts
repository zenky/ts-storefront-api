export enum OrderPaymentTransactionType {
  Payment = 'payment',
  Refund = 'refund',
}

export enum PaymentMethod {
  Cash = 'cash',
  CreditCard = 'credit-card',
  CloudPayments = 'cloudpayments',
  YooKassa = 'yookassa',
  CardToken = 'card_token',
  Bonuses = 'bonuses',
  Alfa = 'alfa',
}

export enum OrderPaymentTransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  PendingRefund = 'pending_refund',
  Refunding = 'refunding',
  Refunded = 'refunded',
}

export interface CashPaymentMeta {
  change?: number | null;
  bill?: number | null;
}

export enum CloudpaymentsChargeType {
  Auth = 'auth',
  Charge = 'charge',
}

export interface CloudpaymentsPaymentMeta {
  widget: {
    publicId: string;
    description: string;
    amount: number;
    currency: string;
    invoiceId: string;
    accountId?: string;
    skin: string;
  };
  payment_page_url: string;
  charge_type: CloudpaymentsChargeType;
  charged_as: CloudpaymentsChargeType | null;
}

export interface OnlinePaymentRedirect {
  redirect_url: string | null;
}

export interface OrderPaymentTransaction {
  id: string;
  type: OrderPaymentTransactionType;
  status: OrderPaymentTransactionStatus;
  method: PaymentMethod;
  amount: number;
  is_online: boolean;
  created_at: string;
  confirmed_at: string | null;
  authorization_confirmed_at: string | null;
  cancelled_at: string | null;
  refunded_at: string | null;
  refund_failed_at: string | null;
  transaction_meta: CashPaymentMeta | CloudpaymentsPaymentMeta | null;
}

export interface CloudpaymentsTransactionReceipt {
  items: {
    label: string;
    price: number;
    quantity: number;
    amount: number;
    vat: number | null;
    measurementUnit: string;
  }[];
  email: string | null;
  phone: string;
  amounts: {
    eletronic: number;
  };
  taxationSystem: number;
}

export interface OrderPaymentMethod {
  id: PaymentMethod;
  name: string;
  meta?: {
    payment_page_url?: string;
  };
  token?: {
    id: string;
    type: string;
    first_six: string;
    last_four: string;
  };
}

export interface OrderPaymentMethodRequest {
  method: PaymentMethod;
  amount?: number | string;
  bill?: number | string;
  save_card?: boolean;
  card_token_id?: string;
}

export interface SetOrderPaymentsRequest {
  payments: OrderPaymentMethodRequest[];
}

export interface OrderCheckoutBonusesPreview {
  bonuses: number;
  unpaid: number;
}

export interface OrderCheckoutTotalPayment {
  id: string;
  method: PaymentMethod;
  amount: number;
  bill?: number;
  change?: number;
  save_card?: boolean;
  card_token_id?: string;
}

export interface OnlinePaymentRedirectRequest {
  current_url?: string;
}
