// src/app/api/webhooks/paypal/route.ts
import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/paypal/paypalService';
import { handleSubscriptionCreated, handleSubscriptionCancelled } from '@/lib/paypal/subscriptionService';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const signature = request.headers.get('PAYPAL-TRANSMISSION-SIG');
    
    if (!signature || !await verifyWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (payload.event_type) {
      case 'BILLING.SUBSCRIPTION.CREATED':
        await handleSubscriptionCreated(payload);
        break;
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(payload);
        break;
      // Add more cases for other event types as needed
      default:
        console.log(`Unhandled event type: ${payload.event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}