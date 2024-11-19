import {PaginationRequest} from "../client/types.ts";

export interface BonusesLevel {
  id: string;
  name: string;
  expenses: number;
  cashback_rate: number | null;
  payment_rate: number | null;
}

export interface LoyaltyRates {
  cashback: number | null;
  payment: number | null;
}

export enum BonusesTransactionType {
  Increase = 'increase',
  Decrease = 'decrease',
}

export enum BonusesTransactionStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Rejected = 'rejected',
  Refunded = 'refunded',
  PartiallyRefunded = 'partially_refunded',
}

export enum BonusesTransactionReason {
  Manual = 'manual',
  Cashback = 'cashback',
  ReferralReward = 'referral_reward',
  RecruitReward = 'recruit_reward',
  Payment = 'payment',
  Cancellation = 'cancellation',
  Refund = 'refund',
  Adjustment = 'adjustment',
  WelcomeBonuses = 'welcome_bonuses',
  PromotionReward = 'promotion_reward',
  External = 'external',
}

export interface BonusesTransaction {
  id: string;
  order_id: string | null;
  type: BonusesTransactionType;
  status: BonusesTransactionStatus;
  reason: BonusesTransactionReason;
  amount: number;
  source_amount: number | null;
  created_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
}

export interface ListBonusesTransactionsRequest extends PaginationRequest {
  type?: BonusesTransactionType;
  status?: BonusesTransactionStatus;
  reason?: BonusesTransactionReason;
}

export interface ListCustomerBonusesTransactionsRequest extends ListBonusesTransactionsRequest {
  order_id?: string;
}
