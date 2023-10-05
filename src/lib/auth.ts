import { PrismaAdapter } from "@auth/prisma-adapter"
import type { DefaultUser, NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/lib/db"

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.uid = user.id
      }
      if (trigger === "update") {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/api/auth/error",
  },
}
