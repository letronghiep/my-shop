import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { checkPermission } from "./helpers/checkPermission";
import { isTokenExpired } from "./helpers/isTokenExpired";
import { handleRefreshToken } from "./services/auth/login";
import { TokenData } from "./types/global";
const publicRoutes = ["/login", "/register"];
enum Permission {
  Admin = "s00001",
  Seller = "s00002",
  User = "s00003",
}
export default async function middleware(req: NextRequest) {
  const refreshTokenCookie = req.cookies.get("refreshToken");
  const { pathname, search, searchParams, origin } = req.nextUrl;
  const protectedPaths = [
    "/profile",
    "/seller",
    "/dashboard",
    "/checkout",
    "/cart",
  ];
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.includes(path)
  );
  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));
  if (isPublicRoute) {
    return NextResponse.next();
  }
  if (searchParams.has("redirected")) return NextResponse.next();
  const redirectUrl = "/login";
  const nextUrl = encodeURIComponent(
    `${origin}${pathname}${search}${searchParams}`
  );
  const url = new URL(redirectUrl, req.url);
  url.searchParams.set("redirected", "true");
  url.searchParams.set("next", nextUrl);
  if (isProtectedRoute) {
    if (!refreshTokenCookie) {
      const response = NextResponse.redirect(url);
      response.cookies.delete("refreshToken");
      return response;
    }
    const refreshToken = refreshTokenCookie.value;
    if (isTokenExpired(refreshToken)) {
      const response = NextResponse.next();
      response.cookies.delete("refreshToken");
      await handleRefreshToken();
      return NextResponse.next();
    }
  }
  if (pathname.startsWith("/dashboard")) {
    if (!refreshTokenCookie) {
      const response = NextResponse.redirect(url);
      response.cookies.delete("refreshToken");
      return response;
    }
    const { role } = jwtDecode(refreshTokenCookie.value) as TokenData;
    if (!checkPermission(role, Permission.Admin)) {
      const response = NextResponse.redirect(
        new URL("/un-authorized", req.url)
      );
      response.cookies.delete("refreshToken");
      return response;
    }
    return NextResponse.next();
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (refreshTokenCookie) {
      const response = NextResponse.redirect(nextUrl);
      return response;
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/settings",
    "/profile",
    "/seller/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
// check token o cookies neu het han thi se request refreshToken
