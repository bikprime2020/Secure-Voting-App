import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const userRole = (auth?.user as any)?.role
      const { pathname } = nextUrl

      const isAdminRoute = pathname.startsWith("/admin")
      const isDashboardRoute = pathname.startsWith("/dashboard")
      const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

      if (isAdminRoute) {
        if (!isLoggedIn) return false
        return userRole === "admin"
      }

      if (isDashboardRoute) {
        return isLoggedIn
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          const redirectUrl = userRole === "admin" ? "/admin" : "/dashboard"
          return Response.redirect(new URL(redirectUrl, nextUrl))
        }
        return true
      }

      return true
    },
  },
  providers: [], // Add empty providers array to be filled in auth.ts
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
