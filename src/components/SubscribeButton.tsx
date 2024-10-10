// src/components/SubscribeButton.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubscribeButtonProps } from '@/lib/types';

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ userId, planId, children }) => {
  const router = useRouter();

  const handleSubscribe = async () => {
    // If the user is not logged in, redirect to sign-up and back to subscribe page
    if (!userId) {
      router.push(`/signin?redirect=/subscribe`);
      return;
    }

    try {
      const response = await fetch('/api/payment/paypal/create-paypal-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, planId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();
      router.push(data.approvalUrl);
    } catch (error) {
      console.error('Subscription error:', error);
      // Handle the error accordingly, e.g., display a message
    }
  };

  return (
    <div onClick={handleSubscribe}>
      {children}
    </div>
  );
};

export default SubscribeButton;