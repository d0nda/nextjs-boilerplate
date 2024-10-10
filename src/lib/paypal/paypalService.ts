// src/lib/paypal/paypalService.ts
import { PAYPAL_API_URL, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from '@/lib/paypal/paypal';

export interface SubscriptionResponse {
  id: string;
  status: string;
  links: Array<{ href: string; rel: string; method: string }>;
}

interface SubscriptionData {
  plan_id: string;
  subscriber: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
  application_context: {
    brand_name: string;
    locale: string;
    shipping_preference: string;
    user_action: string;
    payment_method: {
      payer_selected: string;
      payee_preferred: string;
    };
    return_url: string;
    cancel_url: string;
  };
  custom_id: string;
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

export async function verifySubscriptionWithPayPal(subscriptionId: string): Promise<boolean> {
  try {
    const accessToken = await getAccessToken();
   
    const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`PayPal API responded with status ${response.status}`);
    }
    const data = await response.json();
    return data.status === 'ACTIVE';
  } catch (error) {
    console.error('Error verifying subscription with PayPal:', error);
    return false;
  }
}

export async function createSubscription(subscriptionData: SubscriptionData): Promise<SubscriptionResponse> {
  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) {
    throw new Error(`PayPal API responded with status ${response.status}`);
  }
  return response.json();
}

export async function verifyWebhookSignature(
  payload: Record<string, unknown>,
  signature: string
): Promise<boolean> {
  // Implement PayPal webhook signature verification
  // This is a placeholder and should be implemented according to PayPal's documentation
  console.log('Verifying webhook signature:', { payload, signature });
  return true;
}