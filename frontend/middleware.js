import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export default function middleware(req) {
  const url = req.nextUrl;

  // Redirect root path "/" to "/customers"
  if (url.pathname === "/") {
    url.pathname = "/customers";
    return NextResponse.redirect(url);
  }

  // Let i18nRouter handle other paths
  return i18nRouter(req, i18nConfig);
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
