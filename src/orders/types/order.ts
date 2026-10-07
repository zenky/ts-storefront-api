import { Discount } from "../../types.ts";
import { City, DeliveryZone, Stock } from "../../store/types.ts";
import { Customer } from "../../customers/types.ts";
import { ListRequest } from "../../client/types.ts";
import { DeliveryAddress } from "../../addresses/types.ts";
import { OrderPackage, OrderProductVariant } from "./items.ts";
import { DeliveryMethod, OrderDeliveryInterval } from "./delivery.ts";
import { OrderStatus, OrderStatusChange, OrderStatusProgress } from "./status.ts";
import { OrderPaymentTransaction } from "./payments.ts";
import { OrderPromocode } from "./promotions.ts";
import { OrderReview } from "./reviews.ts";

export type OrderCredentials = string | {
  id: string;
  token: string;
  api_token?: string;
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
  packages?: OrderPackage[];
  packaging_price?: number | null;
  city: City | null;
  stock: Stock | null;
  customer?: Customer | null;
  delivery_address?: DeliveryAddress | null;
  delivery_zone?: DeliveryZone;
  delivery_interval?: OrderDeliveryInterval | null;
  statuses?: OrderStatus[];
  progress?: OrderStatusProgress[];
  payments?: OrderPaymentTransaction[];
  promocode?: OrderPromocode | null;
  can_review: boolean;
  review?: OrderReview | null;
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
