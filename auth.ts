import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a DUMMY credentials provider for demonstration.
        // It accepts any email and password and returns a fake user.
        if (credentials?.email && credentials?.password) {
          return { 
            id: "1", 
            name: "Demo User", 
            email: credentials.email as string 
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isDashboardPath = nextUrl.pathname.startsWith("/dashboard")
      
      if (isDashboardPath) {
        if (isLoggedIn) return true
        return false // Redirect to signIn page
      } else if (isLoggedIn) {
        // If user is already logged in and trying to access login/register, redirect to dashboard
        const isAuthPath = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register")
        if (isAuthPath) {
          return Response.redirect(new URL("/dashboard", nextUrl))
        }
      }
      return true
    },
  },
  trustHost: true,
})
