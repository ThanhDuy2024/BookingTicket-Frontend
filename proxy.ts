import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }
  const adminToken = request.cookies.get("adminToken")?.value;
  let decodeAdmin;
  if (adminToken) {
    decodeAdmin = jwt.verify(String(adminToken), String(process.env.JWT_PASSWORD)) as JwtPayload;
  } else {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!decodeAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};