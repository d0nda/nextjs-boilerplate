// src/app/api/payment/paypal/create-paypal-subscription/route.ts
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/paypal/database-paypal';
import { createSubscription, SubscriptionResponse } from '@/lib/paypal/paypalService';
import { NEXT_PUBLIC_BASE_URL } from '@/lib/paypal/paypal';
import { getSubscriptionPlan } from '@/lib/subscriptionPlans';

import { auth } from '../../../../../../auth';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();
    const userProfile = await getUserProfile(session.user.id);
    const plan = getSubscriptionPlan(planId);

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    const subscriptionData = {
      plan_id: plan.id,
      subscriber: {
        name: {
          given_name: userProfile.name?.split(' ')[0] || '',
          surname: userProfile.name?.split(' ').slice(1).join(' ') || '',
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
      custom_id: session.user.id,
    };

    const data: SubscriptionResponse = await createSubscription(subscriptionData);
   
    return NextResponse.json({ approvalUrl: data.links.find((link) => link.rel === 'approve')?.href });
  } catch (error) {
    console.error('Error creating PayPal subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}