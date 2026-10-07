import { DiscountType } from "../../types.ts";
import {
  DadataDeliveryAddressRequest,
  ExistedDeliveryAddressRequest,
  ManualDeliveryAddressRequest,
} from "../../addresses/types.ts";
import { OrderPaymentMethod } from "./payments.ts";

export enum DeliveryMethod {
  Delivery = 'delivery',
  Pickup = 'pickup',
  OnPremise = 'on_premise',
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
  Promocode = 'promocode',
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

export interface SetOrderDeliveryRequest {
  delivery_method: DeliveryMethod;
  delivery_address?: ExistedDeliveryAddressRequest | DadataDeliveryAddressRequest | ManualDeliveryAddressRequest;
  stock_id?: string;
  on_premise?: {
    table: string;
  };
  deliver_at?: string;
}

export interface SetOrderDeliveryIntervalRequest {
  date: string;
  interval_id: string;
}

export interface SetOrderDeliveryTimeRequest {
  deliver_at: string;
}

export interface OrderDeliveryInterval {
  id: string;
  date: {
    iso: string;
    date: string;
  };
  start_time: string;
  end_time: string;
}
