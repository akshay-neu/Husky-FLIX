require("dotenv").config();
const express = require("express");
const Stripe = require("stripe"); // payments api
const stripe = Stripe(process.env.STRIPE_SECRET_KEY) //we require a secret key
const router = express.Router();

// route for payment
router.post("/pay", async (req, res) => {
  try {
    const amount = 6999; // denomination in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        name: "value",
      },
    }); // paymentintent contains payment details
    // client secret  Used for client-side retrieval using a publishable key. 
    //The client secret can be used to complete a payment from  frontend
    const clientSecret = paymentIntent.client_secret;  
    res.json({ clientSecret, message: "Payment Initiated" }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" }); 
  }
});

// For getting payment response status
router.post("/stripe", (req, res) => {
  if (req.body.type === "payment_intent.created") {
    console.log(`${req.body.data.object.metadata.name} initated payment!`);
  }
  if (req.body.type === "payment_intent.succeeded") {
    console.log(`${req.body.data.object.metadata.name} succeeded payment!`);
  }
});


module.exports = router;
