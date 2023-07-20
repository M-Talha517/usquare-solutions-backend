var express = require('express');
var router = express.Router();
var shared = require('../controllers/controller.shared.js');
const stripe = require("stripe")("sk_test_51IZdAfL1AJn6gWkSWaB4tH65zYq0LRobm1QOY1sIkVeC5ZxtUn9cFsN6y67toeeNXq4QSZTwQHVSBeAKAuqUhbK900nwZHS9Xm");
require('dotenv').config();

// Login for both serviceProvider and Customer
router.post('/login', function (req, res) {
  console.log("login api")
  let email = req.body.email;
  let password = req.body.password;
  shared.login(email, password, res);

});

// Reset Password User
router.post('/resetPassword', function (req, res) {
  let email = req.body.email;
  shared.reset(email, res);
});


// calculateOrderAmount by multiplying it with 100 - we need to send amount to stripe in cents
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 100 * items;
};

// Stripe payment intent api
router.post("/create-payment-intent", async (req, res) => {
  const price = req.body.price;
  console.log(calculateOrderAmount(price))
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(price),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


const YOUR_DOMAIN = process.env.DOMAIN;
console.log(YOUR_DOMAIN)
router.post('/create-checkout-session', async (req, res) => {
  var productData = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productData.data_id.name,
            images: [productData.data_id.data_image],
          },
          unit_amount: calculateOrderAmount(productData.price),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/#/business_bid/list?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/#/business_bid/list`,
  });
  res.json({ id: session.id });
});

module.exports = router;