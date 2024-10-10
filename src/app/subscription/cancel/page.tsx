// src/app/subscription/cancel/page.tsx
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Subscription Cancel | Boiler',
  description: 'Subscription Cancel',
}

export default function SubscriptionCancelPage() {
  redirect('/');
}