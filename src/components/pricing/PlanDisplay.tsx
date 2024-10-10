// src/components/priceplans/PlanDisplay.tsx
'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';
import { Button } from '../ui/button';
import { PlanDisplayProps } from '@/lib/types';

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plans, userId }) => {
  const [isYearly, setIsYearly] = useState(false);

  const filteredPlans = plans.filter(
    (plan) => plan.interval === (isYearly ? '/yr' : '/mo')
  );

  return (
    <>
      <div className="flex justify-center mx-auto border-2 border-indigo-600 rounded overflow-hidden mt-6 mb-12">
        <button
          className={`py-1 px-4 focus:outline-none ${
            !isYearly ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={`py-1 px-4 focus:outline-none ${
            isYearly ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => setIsYearly(true)}
        >
          Annually
        </button>
      </div>
      <div className="flex flex-wrap justify-center -m-4">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div
              className={`h-full p-6 rounded-lg border-2 ${
                plan.isPopular ? "border-indigo-500" : "border-gray-300"
              } flex flex-col relative overflow-hidden`}
            >
              {plan.isPopular && (
                <span className="bg-indigo-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
              )}
              <h2 className="text-md tracking-widest title-font mb-1 font-medium">
                {plan.name}
              </h2>
              <h1 className="text-5xl leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>
                  {plan.currency}
                  {plan.price}
                </span>
                <span className="text-lg ml-1 font-normal text-gray-700">
                  {plan.interval}
                </span>
              </h1>
              {plan.description.map((item, index) => (
                <p key={index} className="flex items-center mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-600 text-white rounded-full flex-shrink-0">
                    <Check className="bg-green-600" size={16} />
                  </span>
                  {item}
                </p>
              ))}
              <div className="mt-auto">
                <SubscribeButton userId={userId} planId={plan.id}>
                  <Button
                    className={`flex items-center mt-auto text-white border-0 py-2 px-4 w-full focus:outline-none rounded ${
                      plan.isPopular
                        ? "bg-indigo-600 hover:bg-indigo-800"
                        : "bg-gray-500 hover:bg-gray-700"
                    }`}
                  >
                    Subscribe
                    <ArrowRight size={16} className="ml-auto" />
                  </Button>
                </SubscribeButton>
              </div>
              <p className="text-xs mt-3">
                Secure payment with Paypal.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlanDisplay;