//lib/types.ts

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  paypal_subscription_id: string | null;
  subscription_status: SubscriptionStatus | null;
  current_plan: string | null;
}


export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string[];
    price: number;
    currency: string;
    interval: '/mo' | '/yr';
    isPopular: boolean;
  }