import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const COOKIE_NAME = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── Admin route protection ───────────────────────────────── */
  if (pathname.startsWith("/admin")) {

    // Always allow the login page through
    if (pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      const session = request.cookies.get(COOKIE_NAME)?.value;
      if (session && session === ADMIN_SECRET) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // Check for valid session cookie on all other /admin/* routes
    const session = request.cookies.get(COOKIE_NAME)?.value;

    if (!session || session !== ADMIN_SECRET) {
      // Not logged in — redirect to login, preserving the intended URL
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/explore/:path*",
    "/dashboard/:path*",
  ],
};