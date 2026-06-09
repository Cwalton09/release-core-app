import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages that require a paid subscription
const PROTECTED_ROUTES = [
  "/dashboard",
  "/start-session",
  "/session-entry",
  "/grounding-scripts",
  "/quick-relief",
  "/daily-practices",
];

// Pages only accessible when NOT logged in
const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Not logged in trying to access protected page → send to login
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in but on login/signup → send to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Logged in and accessing protected route → check paid status
  if (isProtected && session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("paid")
      .eq("user_id", session.user.id)
      .maybeSingle();

    // Not paid → send to Stripe
    if (!profile?.paid) {
      return NextResponse.redirect(new URL("https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/start-session/:path*",
    "/session-entry/:path*",
    "/grounding-scripts/:path*",
    "/quick-relief/:path*",
    "/daily-practices/:path*",
    "/login",
    "/signup",
  ],
};
