// src/app/subscription/success/page.tsx
import { redirect } from 'next/navigation';
import { updateUserSubscription } from '@/lib/paypal/database-paypal';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { verifySubscriptionWithPayPal } from '@/lib/paypal/paypalService';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription Successful | Boiler',
  description: 'Subscription Success page',
}

export default async function SubscriptionSuccessPage({ searchParams }: { searchParams: { subscription_id: string } }) {
  const { subscription_id } = searchParams;
  
  if (!subscription_id) {
    redirect('/subscription/error?reason=missing_subscription_id');
  }

  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.error('Auth error:', authError);
    redirect('/signin');
  }

  try {
    // Verify the subscription with PayPal
    const isValid = await verifySubscriptionWithPayPal(subscription_id);

    if (isValid) {
      // Update user's subscription status
      await updateUserSubscription(user.id, subscription_id, 'active');
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Subscription Successful!</h1>
          <p className="mb-4">Your premium subscription is now active.</p>
          <a href="/dashboard" className="text-blue-500 hover:underline">Go to Dashboard</a>
        </div>
      );
    } else {
      // Handle invalid subscription
      redirect('/subscription/error?reason=invalid_subscription');
    }
  } catch (error) {
    console.error('Error processing subscription:', error);
    redirect('/subscription/error?reason=processing_error');
  }
}

