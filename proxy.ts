import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Sử dụng jose thay vì jsonwebtoken

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const secret = new TextEncoder().encode("DONGUYENDIEUANH");

  // 1. Nếu đã có token mà cố vào trang login -> đẩy sang dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // 2. Nếu chưa có token mà vào các trang admin khác -> đẩy về login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 3. Verify token bằng thư viện jose
  if (token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verify failed:", error);
      // Nếu token sai signature hoặc hết hạn -> xóa cookie và đẩy về login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("adminToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};