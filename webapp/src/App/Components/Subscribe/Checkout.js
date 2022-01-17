import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";  // stripe elements
import React from "react";
import "./Checkout.scss";
import axios from 'axios'; // library for HTTP requests
import { USER_SERVER } from '../../Config/Config.js' // predefined api url


function Checkout(props) {

  console.log("props", props);
  const stripe = useStripe(); //returns reference of stripe instance passed to the elements provider
  const elements = useElements(); // returns reference of stripe elements

  const pay = async () => {
    try {
      const response = await fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }); // psot method for payment
      const data = await response.json();
      console.log("data", data);
      const cardElement = elements.getElement(CardElement); // get card details
      const confirmPayment = await stripe.confirmCardPayment(
        data.clientSecret,
        { payment_method: { card: cardElement } } // display dialog for payment authentication
      );
      console.log(confirmPayment);
      const { paymentIntent } = confirmPayment; //payment intent contains payment information such as currency, amount to be charged, payment type for ex. card
      if (paymentIntent.status === "succeeded")
      { 
        alert(`Payment successful!`)
        
      }
      else {alert(`Payment failed!`);}

      if(paymentIntent.status === "succeeded") { // update user db that user is subscribed after payment
        const request = axios.put(`${USER_SERVER}/subscribed`,props.user.userData)
        .then(response => response.data);

        //return request;
        window.location.href = "/Subscription";  // redirect to subscription page
      }
    } catch (err) {
      console.error(err);
      alert("There was an error in payment");
    }
  };

  // Payment button
  return (
    <div className="somediv">
      <div className="amount">
                    <p>Pay $69.99</p>
                </div>
    <div className="checkout">
      <CardElement />
      <button onClick={pay}>Pay</button>
    </div>
    </div>
  );
}

export default Checkout;
