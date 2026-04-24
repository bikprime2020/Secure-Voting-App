import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        const creds = credentials as any;
        if (!creds?.email || !creds?.password) return null;

        // Check against our mock database
        const user = db.getUsers().find(u => u.email === creds.email);
        
        if (user) {
          // In a real app, you would verify the password here
          return { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            role: user.role
          }
        }
        
        // Allow demo login for anyone if not in DB, but with user role
        return { 
          id: Math.random().toString(36).substring(7), 
          name: creds.name || (creds.email as string).split('@')[0], 
          email: creds.email as string,
          role: (creds.email as string).toLowerCase() === "admin@securevote.com" ? "admin" : "user"
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = (token.role as string) || "user"
        session.user.id = (token.id as string) || (token.sub as string)
      }
      return session
    },
  },
  trustHost: true,
})
