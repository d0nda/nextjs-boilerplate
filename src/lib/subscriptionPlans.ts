// src/config/subscriptionPlans.ts
import { SubscriptionPlan } from '@/lib/types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'P-7CD326636H2572527M2Z6SFQ',
    name: 'Basic Bloq',
    description: ["Create up to 3 pages", "Access to essential blocks", "Basic customization options", "Mobile-responsive designs"],
    price: 5,
    currency: '$',
    interval: '/mo',
    isPopular: false,
  },
  {
    id: 'P-8V883430NM6560021M2Z77CQ',
    name: 'Basic Bloq',
    description: ["Create up to 3 pages", "Access to essential blocks", "Basic customization options", "Mobile-responsive designs"],
    price: 60,
    currency: '$',
    interval: '/yr',
    isPopular: false,
  },
  {
    id: 'P-9UB53279LK934743VM2Z65AQ',
    name: 'Pro Bloq',
    description: ["Create up to 10 pages", "Access to premium blocks", "Advanced customization options", "Custom domain"],
    price: 15,
    currency: '$',
    interval: '/mo',
    isPopular: true,
  },
  {
    id: 'P-5N860336RM773912NM3O35JI',
    name: 'Pro Bloq',
    description: ["Create up to 10 pages", "Access to premium blocks", "Advanced customization options", "Custom domain"],
    price: 180,
    currency: '$',
    interval: '/yr',
    isPopular: true,
  },
  {
    id: 'P-7CD326636H2572527M2Z6UVW',
    name: 'Ultimate Bloq',
    description: ["Unlimited pages", "Full library of blocks", "Advanced analytics", "A/B testing", "Priority email support"],
    price: 30,
    currency: '$',
    interval: '/mo',
    isPopular: false,
  },
  {
    id: 'P-8V883430NM6560021M2Z7DEF',
    name: 'Ultimate Bloq',
    description: ["Unlimited pages", "Full library of blocks", "Advanced analytics", "A/B testing", "Priority email support"],
    price: 360,
    currency: '$',
    interval: '/yr',
    isPopular: false,
  },
];

export const getSubscriptionPlan = (planId: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find(plan => plan.id === planId);
};