import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe client is created per request so `next build` doesn't need the secret key.
export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const { email } = await req.json();

    const customers = await stripe.customers.list({ email, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: "No Stripe customer found" }, { status: 404 });
    }

    const customer = customers.data[0];

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: "https://release-core.com/dashboard",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}