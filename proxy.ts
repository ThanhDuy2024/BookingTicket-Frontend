import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;
  
  const isLoginPage = pathname === "/admin/login";

  // 1. Nếu ĐÃ CÓ cookie mà cố tình vào trang login -> Đẩy sang dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // 2. Nếu CHƯA CÓ cookie mà vào các trang admin (ngoại trừ trang login) -> Đẩy về login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 3. Các trường hợp còn lại (có cookie vào dashboard, hoặc chưa cookie vào login) -> Cho đi tiếp
  return NextResponse.next();
}

// Cấu hình để middleware chỉ chạy cho các route bắt đầu bằng /admin
export const config = {
  matcher: ["/admin/:path*"],
};