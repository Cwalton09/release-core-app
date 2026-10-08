// The Stripe Payment Link new members subscribe through. Members who signed up
// on an older price keep that price; only this link decides what new members pay.
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

type CheckoutUser = { id: string; email?: string | null } | null | undefined;

// Sends the person to Stripe checkout, tagged with their user id so the Stripe
// webhook can mark the right profile as paid once the payment actually succeeds.
export function goToCheckout(user: CheckoutUser) {
  const url = new URL(STRIPE_PAYMENT_LINK);
  if (user?.id) url.searchParams.set("client_reference_id", user.id);
  if (user?.email) url.searchParams.set("prefilled_email", user.email);
  window.location.href = url.toString();
}
