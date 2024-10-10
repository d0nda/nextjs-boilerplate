//lib/types.ts
import { Session } from 'next-auth';

export interface User {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    paypal_subscription_id: string | null;
    subscription_status: SubscriptionStatus | null;
    current_plan: string | null;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface CustomSession extends Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
}

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

export interface SubscribeButtonProps {
    userId: string | null;
    planId: string;
    children: React.ReactNode;
}

export interface PlanDisplayProps {
    plans: SubscriptionPlan[];
    userId: string | null;
}