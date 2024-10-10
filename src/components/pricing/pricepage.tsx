// src/components/priceplans/PlanDisplay.tsx
import { subscriptionPlans } from '@/lib/subscriptionPlans';
import PlanDisplay from '@/components/pricing/PlanDisplay';
import { auth } from '../../../auth';

export default async function PricePage() {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  return (
    <section className="body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="font-semibold sm:text-4xl text-3xl title-font mb-2 text-black dark:text-white">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Simple pricing model starting from $5 per month. No hidden fees.
          </p>
          <PlanDisplay plans={subscriptionPlans} userId={userId} />
        </div>
      </div>
    </section>
  );
}