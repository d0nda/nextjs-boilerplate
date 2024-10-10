// src/services/subscriptionService.ts
import { updateUserSubscription } from '@/lib/paypal/database-paypal';
import { verifySubscriptionWithPayPal } from '@/lib/paypal/paypalService';

export async function handleSubscriptionCreated(payload: any) {
  const userId = payload.resource.custom_id;
  const subscriptionId = payload.resource.id;
  
  const isValid = await verifySubscriptionWithPayPal(subscriptionId);
  
  if (isValid) {
    await updateUserSubscription(userId, subscriptionId, 'active');
  } else {
    console.error(`Invalid subscription detected: ${subscriptionId}`);
    // Implement additional error handling (e.g., notify admin)
  }
}

export async function handleSubscriptionCancelled(payload: any) {
  const userId = payload.resource.custom_id;
  const subscriptionId = payload.resource.id;
  
  await updateUserSubscription(userId, subscriptionId, 'cancelled');
}