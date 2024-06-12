// import NextAuth from "next-auth"
// import { authConfig } from "./lib/auth.config"

import { auth } from "./lib/auth"

export default auth

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"]
}