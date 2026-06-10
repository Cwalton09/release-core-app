// updated
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!isAuthRoute) return NextResponse.next();

  const hasSession = req.cookies.getAll().some(
    (cookie) => cookie.name.includes("sb-") && cookie.name.includes("-auth-token")
  );

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};