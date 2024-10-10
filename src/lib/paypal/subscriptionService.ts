// src/lib/paypal/subscriptionService.ts
import { updateUserSubscription } from '@/lib/paypal/database-paypal';
import { verifySubscriptionWithPayPal } from '@/lib/paypal/paypalService';
import { SubscriptionStatus } from '@/lib/types';  // Assuming you have this type defined in your types file

interface PayPalSubscriptionResource {
  id: string;
  custom_id: string;
  status: string;
}

interface PayPalWebhookPayload {
  event_type: string;
  resource: PayPalSubscriptionResource;
}

export async function handleSubscriptionCreated(payload: PayPalWebhookPayload): Promise<void> {
  const userId = payload.resource.custom_id;
  const subscriptionId = payload.resource.id;

  const isValid = await verifySubscriptionWithPayPal(subscriptionId);

  if (isValid) {
    await updateUserSubscription(userId, subscriptionId, 'active' as SubscriptionStatus);
  } else {
    console.error(`Invalid subscription detected: ${subscriptionId}`);
    // Implement additional error handling (e.g., notify admin)
  }
}

export async function handleSubscriptionCancelled(payload: PayPalWebhookPayload): Promise<void> {
  const userId = payload.resource.custom_id;
  const subscriptionId = payload.resource.id;

  await updateUserSubscription(userId, subscriptionId, 'cancelled' as SubscriptionStatus);
}