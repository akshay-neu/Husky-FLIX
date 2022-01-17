import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY); // stripe promise containing the stripe private key

// calling the checkout page
function Subscribe() {
    return (
      <div>
        {/* pass the value of promise to the checkout element */}
      <Elements stripe={stripePromise}> 
        <Checkout />
      </Elements>
      </div>
    )
}

export default Subscribe;
