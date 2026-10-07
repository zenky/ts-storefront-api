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
