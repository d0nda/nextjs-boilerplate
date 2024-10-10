// lib/database-paypal.ts
import { prisma } from '@/lib/prisma';
import { UserProfile, SubscriptionStatus } from '@/lib/types';

export const updateUserSubscription = async (
  userId: string, 
  subscriptionId: string, 
  status: SubscriptionStatus
): Promise<UserProfile> => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      paypal_subscription_id: subscriptionId,
      subscription_status: status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      paypal_subscription_id: true,
      subscription_status: true,
      current_plan: true,
    },
  });
  return {
    ...updatedUser,
    subscription_status: updatedUser.subscription_status as SubscriptionStatus | null,
  };
};

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      paypal_subscription_id: true,
      subscription_status: true,
      current_plan: true,
    },
  });
  
  if (!user) throw new Error('User not found');
  
  return {
    ...user,
    subscription_status: user.subscription_status as SubscriptionStatus | null,
  };
};

export const cancelUserSubscription = async (userId: string): Promise<UserProfile> => {
  return updateUserSubscription(userId, '', 'cancelled');
};