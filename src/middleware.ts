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
  const refreshToken = req.cookies.get('refreshToken');
  const { pathname, search, searchParams, origin } = req.nextUrl;
  const protectedRoutes = [
    "/profile",
    "/seller",
    "/dashboard",
    "/checkout",
    "/cart",
  ];
  const isAccessRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.includes(path)
  );
  if (searchParams.has("redirected")) return NextResponse.next();
  const redirectUrl = "/login";
  const nextUrl = encodeURIComponent(
    `${origin}${pathname}${search}${searchParams}`
  );
  const url = new URL(redirectUrl, req.url);
  url.searchParams.set("redirected", "true");
  url.searchParams.set("next", nextUrl);
  if (isAccessRoute) {
    if (!refreshToken) {
      const response = NextResponse.redirect(url);
      response.cookies.delete("refreshToken");
      return response;
    }
    if (isTokenExpired(refreshToken.value)) {
      const response = NextResponse.next();
      response.cookies.delete("refreshToken");
      const data = await handleRefreshToken();
      if (data) {
        response.cookies.set({
          name: "refreshToken",
          value: data.metadata.tokens.refreshToken,
          maxAge: 24 * 60 * 60 * 7,
          httpOnly: true,
        });
        return NextResponse.next();
      }
      return NextResponse.next();
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!refreshToken) {
      const response = NextResponse.redirect(url);
      response.cookies.delete("refreshToken");
      return response;
    }
    const token: TokenData = await jwtDecode(refreshToken.value);
    const { role } = token;
    if (!checkPermission(role, Permission.Admin)) {
      const response = NextResponse.redirect(
        new URL("/un-authorized", req.url)
      );
      response.cookies.delete("refreshToken");
      return response;
    }
    return NextResponse.next();
  }
  // if (req.nextUrl.pathname.startsWith("/login")) {
  //   console.log(req.nextUrl.pathname)
  //   const accessToken = req.cookies.get("accessToken");
  //   const response = NextResponse.next();
  //   response.cookies.delete("accessToken");
  //   response.cookies.delete("refreshToken");
  //   if (accessToken) {
  //     if(!isTokenExpired(accessToken.value)) {
  //         return response;
  //     }
  //   }
  //   return response;
  // }
}
export const config = {
  matcher: [
    "/settings",
    "/profile",
    "/seller/:path*",
    "/dashboard/:path*",
    // "/login/:path*",
    // "/register/:path*",
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
// check token o cookies neu het han thi se request refreshToken
