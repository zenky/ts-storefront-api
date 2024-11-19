import { Discount, DiscountType, Phone, PhoneRequest, RecaptchaRequest } from "../types.ts";
import {City, DeliveryZone, Stock} from "../store/types.ts";
import {
  DadataDeliveryAddressRequest,
  DeliveryAddress,
  ExistedDeliveryAddressRequest,
  ManualDeliveryAddressRequest
} from "../addresses/types.ts";
import {Product, ProductModifiersRequest, ProductVariant} from "../products/types.ts";
import {BasicModifiersGroup, Modifier} from "../modifiers/types.ts";
import {Customer, Gender} from "../customers/types.ts";
import {ListRequest} from "../client/types.ts";
import {ConfirmationMethod} from "../authentication/types.ts";

export type OrderCredentials = string | {
  id: string;
  token: string;
  api_token?: string;
}

export enum DeliveryMethod {
  Delivery = 'delivery',
  Pickup = 'pickup',
  OnPremise = 'on_premise',
}

export interface OrderStatusKind {
  Pending: 'pending';
  AwaitingPayment: 'awaiting_payment';
  Submitted: 'submitted';
  Exported: 'exported';
  Packing: 'packing';
  Ready: 'ready';
  AwaitingDelivery: 'awaiting_delivery';
  Delivering: 'delivering';
  Delivered: 'delivered';
  Rejected: 'rejected';
  Cancelled: 'cancelled';
  Completed: 'completed';
  Custom: 'custom';
}

export enum OrderPaymentTransactionType {
  Payment = 'payment',
  Refund = 'refund',
}

export enum PaymentMethod {
  Cash = 'cash',
  CreditCard = 'credit-card',
  CloudPayments = 'cloudpayments',
  CardToken = 'card_token',
  Bonuses = 'bonuses',
}

export enum OrderPaymentTransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  PendingRefund = 'pending_refund',
  Refunding = 'refunding',
  Refunded = 'refunded',
}

export interface OrderStatus {
  id: string;
  kind: OrderStatusKind;
  name: string | null;
}

export interface OrderStatusChange extends OrderStatus {
  transitioned_at: string;
}

export interface OrderStatusProgress extends OrderStatus {
  transitioned_at: string | null;
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

export interface OrderPaymentTransaction {
  id: string;
  type: OrderPaymentTransactionType;
  status: OrderPaymentTransactionStatus;
  method: PaymentMethod;
  amount: number;
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

export interface OrderProductVariantModifier {
  id: string;
  modifiers_group_id: string | null;
  quantity: number;
  total_price: number | null;
  unit_price: number | null;
  original_price: number | null;
  original_unit_price: number | null;
  modifier?: Modifier | null;
  modifiers_group?: BasicModifiersGroup | null;
}

export interface OrderProductVariant {
  id: string;
  product_id: string;
  product_variant_id: string;
  stock_id: string | null;
  promotion: {
    id: string;
    reward_id: string;
  } | null;
  quantity: number;
  has_measured_quantity: boolean;
  measured_quantity: number | null;
  total_price: number;
  original_total_price: number | null;
  unit_price: number;
  original_unit_price: number | null;
  discount: Discount | null;
  modifiers_hash: string | null;
  product?: Product;
  variant?: ProductVariant;
  modifiers?: OrderProductVariantModifier[];
}

export interface Order {
  id: string;
  token: string;
  number: string | null;
  delivery_method: DeliveryMethod | null;
  total_price: number;
  original_total_price: number | null;
  discount: Discount | null;
  notes: string | null;
  created_at: string;
  submitted_at: string | null;
  deliver_at: string | null;
  meta_data: {
    deliver_at?: string | null;
    on_premise?: {
      table: string | null;
    } | null;
  } | null;
  status: OrderStatusChange | null;
  variants: OrderProductVariant[];
  city: City | null;
  stock: Stock | null;
  customer?: Customer | null;
  delivery_address?: DeliveryAddress | null;
  delivery_zone?: DeliveryZone;
  statuses?: OrderStatus[];
  progress?: OrderStatusProgress[];
  payments?: OrderPaymentTransaction[];
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

export interface OrderDeliveryMethod {
  id: DeliveryMethod;
  name: string;
  min_price: number | null;
  delivery_price: number | null;
  discount: {
    type: DiscountType;
    value: number;
  } | null;
}

export enum OrderOptionKind {
  PersonsCount = 'persons_count',
  DeliveryTime = 'delivery_time',
  DeliveryIntervals = 'delivery_intervals',
}

export interface DeliveryInterval {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
}

export interface DeliveryIntervalsGroup {
  day_id: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  date: string;
  name: string;
  intervals: DeliveryInterval[];
}

export interface DeliveryIntervalsMeta {
  is_required: boolean;
  delivery_methods: DeliveryMethod[];
  intervals: DeliveryIntervalsGroup[];
}

export interface OrderOption {
  id: string;
  kind: OrderOptionKind;
  meta: DeliveryIntervalsMeta | null;
}

export interface OrderSettings {
  payment_methods: OrderPaymentMethod[];
  delivery_methods: OrderDeliveryMethod[];
  options: OrderOption[];
}

export enum OrderCartCheckerResultReason {
  PriceMismatch = 'price_mismatch',
  OutOfStock = 'out_of_stock',
  Unavailable = 'unavailable',
}

export enum OrderCartCheckerResultAction {
  None = 'none',
  Cleanup = 'cleanup',
}

export interface OrderCartCheckerResult {
  order_variants: {
    id: string;
    product_variant_id: string;
    quantity: number;
    reasons: OrderCartCheckerResultReason[];
  }[];
  action: OrderCartCheckerResultAction;
}

export interface ListOrdersRequest extends ListRequest {
  submitted_from?: string;
  submitted_till?: string;
  order_status_id?: string;
  city_id?: string;
  submission_period?: string;
}

export interface CreateOrderRequest {
  city_id: string;
}

export interface OrderProductVariantRequest {
  product_variant_id: string;
  quantity: number;
  promotion_id?: string;
  promotion_reward_id?: string;
  modifiers?: ProductModifiersRequest[];
}

export interface SetOrderCustomerRequest {
  phone?: PhoneRequest;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
}

export interface SetOrderDeliveryRequest {
  delivery_method: DeliveryMethod;
  delivery_address?: ExistedDeliveryAddressRequest | DadataDeliveryAddressRequest | ManualDeliveryAddressRequest;
  stock_id?: string;
  on_premise?: {
    table: string;
  };
  deliver_at?: string;
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

export interface OrderCheckoutTotal {
  min_price: number | null;
  subtotal: number;
  original_subtotal: number | null;
  delivery_price: number | null;
  delivery_discount: number | null;
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

export interface OrderConfirmationResult {
  success: boolean;
  token: string | null;
}

export interface OrderPromotionReward {
  id: string;
  promotion_id: string;
  promotion_reward_id: string;
  item_id: string | null;
  amount: number | null;
  total_amount: number | null;
  count: number;
}
