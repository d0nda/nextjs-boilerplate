// src/app/api/payment/paypal/create-paypal-subscription/route.ts
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/paypal/database-paypal';
import { createSubscription, SubscriptionResponse } from '@/lib/paypal/paypalService';
import { NEXT_PUBLIC_BASE_URL } from '@/lib/paypal/paypal';
import { getSubscriptionPlan } from '@/lib/subscriptionPlans';

export async function POST(request: Request) {
  try {
    const { userId, planId } = await request.json();
    const userProfile = await getUserProfile(userId);
    const plan = getSubscriptionPlan(planId);

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    const subscriptionData = {
      plan_id: plan.id,
      subscriber: {
        name: {
          given_name: userProfile.first_name,
          surname: userProfile.last_name,
        },
        email_address: userProfile.email,
      },
      application_context: {
        brand_name: 'boiler',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
        },
        return_url: `${NEXT_PUBLIC_BASE_URL}/subscription/success`,
        cancel_url: `${NEXT_PUBLIC_BASE_URL}/subscription/cancel`,
      },
      custom_id: userId,
    };

    const data: SubscriptionResponse = await createSubscription(subscriptionData);
    
    return NextResponse.json({ approvalUrl: data.links.find((link) => link.rel === 'approve')?.href });
  } catch (error) {
    console.error('Error creating PayPal subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}