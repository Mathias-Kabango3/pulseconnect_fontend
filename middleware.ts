import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get and normalize role
  const role = request.cookies.get("role")?.value?.trim()?.toUpperCase();

  // Redirect to login if no role is found
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Protect doctors routes
  if (request.nextUrl.pathname.startsWith("/doctors")) {
    if (role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Protect patients routes
  if (request.nextUrl.pathname.startsWith("/patients")) {
    if (role !== "PATIENT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the middleware runs on all protected paths
export const config = {
  matcher: ["/admin/:path*", "/doctors/:path*", "/patients/:path*"],
};
