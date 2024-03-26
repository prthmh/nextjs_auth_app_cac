import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//This funciton can be markes 'async' if using 'await' inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

//See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/profile/:id*", "/login", "/signup"],
};
