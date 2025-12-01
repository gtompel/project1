'use client';

import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Define the props interface for the Stripe component
interface StripeProps {
  children: ReactNode; // This will hold any valid React children
  options?: any; // Optional property, specify the correct type if known
  className?: string; // Optional property for class names
}

// This is a placeholder component to simulate the Stripe integration
export function Stripe({ children, options, className }: StripeProps) {
  const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || ''));

  return (
    <div className={className}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </div>
  );
}
