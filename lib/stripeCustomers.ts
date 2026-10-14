import Stripe from "stripe";

// Every Stripe customer with this email. customers.list matches email exactly,
// including capitalization, while app logins are stored lowercase, so a customer
// saved as "Name@gmail.com" would be missed. Stripe's search matches emails
// without regard to case, so use both.
export async function customerIdsForEmail(stripe: Stripe, email: string) {
  const ids = new Set<string>();
  const exact = await stripe.customers.list({ email, limit: 20 });
  for (const c of exact.data) ids.add(c.id);

  try {
    const found = await stripe.customers.search({
      query: `email:"${email.replace(/["\\]/g, "")}"`,
      limit: 20,
    });
    for (const c of found.data) ids.add(c.id);
  } catch (err) {
    // Search isn't available on every account; the exact match above still applies.
    console.error("Stripe customer search failed:", err);
  }

  return [...ids];
}
