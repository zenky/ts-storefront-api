export interface SetOrderPromocodeRequest {
  promocode: string;
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

export interface OrderPromocode {
  type: 'plain';
  promocode: string;
  message: string;
}

export interface PromotionCheckOrderData {
  id: string;
  token: string;
}

export interface PromotionRewardSelectionData extends PromotionCheckOrderData {
  offer: { id: string; short_id: string | null; slug: string | null };
  promotion_id: string;
  reward_id: string;
  context: {
    type:
      | 'category'
      | 'products_group'
      | 'product'
      | 'variant'
      | 'variant_option'
      | 'variant_option_value';
    id: string;
  } | null;
  limit: number;
}

export type PromotionCheckEvent =
  | { event: 'orders.reload' | 'orders.rewards.reload'; data: PromotionCheckOrderData }
  | { event: 'orders.rewards.display_selection'; data: PromotionRewardSelectionData };

export interface ClosestPromotion {
  id: string;
  label: string;
  min_price: number;
  current_price: number;
}

export interface CheckPromotionsSyncResponse {
  events: PromotionCheckEvent[];
  closest_promotion: ClosestPromotion | null;
}
