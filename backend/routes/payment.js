// backend/routes/payment.js

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // secret Stripe key here
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { cart, customerDetails } = req.body;

  // Calculate the total amount (in cents)
  const totalAmount = cart.reduce((total, item) => total + item.price * 100, 0); // Convert to cents

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      payment_method_types: ['card'], // You can extend this for other payment methods (e.g., bank accounts)
    });

    // Send the client secret back to the frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment failed');
  }
});

module.exports = router;
