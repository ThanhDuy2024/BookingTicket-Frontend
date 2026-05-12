import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;

  const isLoginPage =
    request.nextUrl.pathname === "/admin/login";

  // Nếu đã login mà vào login page
  if (token && isLoginPage) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  // Chưa login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // Verify token
  if (token) {
    try {
      jwt.verify(
        token,
        String(process.env.JWT_PASSWORD)
      );

      return NextResponse.next();

    } catch {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};