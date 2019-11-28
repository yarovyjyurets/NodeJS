async function placeOrder(sessionId) {
  const stripe = Stripe('pk_test_1Vvr9ZmpYMT1c2ls8roRPmEF006xSZFWGy');
  await stripe.redirectToCheckout({ sessionId })
}

