// /src/lib/authOptions.js
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    // Social login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    // We'll enable this after we build /register next step
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;

        const db = await getDb();
        const user = await db.collection("users").findOne({ email: String(email).toLowerCase() });
        if (!user || !user.passwordHash) return null;

        const ok = await bcrypt.compare(String(password), user.passwordHash);
        if (!ok) return null;

        return { id: user._id.toString(), name: user.name || "", email: user.email, image: user.image || null };
      }
    })
  ],
  // We'll point to our own /login page now
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // If Google login, upsert a basic user record
      if (account?.provider === "google" && profile?.email) {
        const db = await getDb();
        const email = profile.email.toLowerCase();
        await db.collection("users").updateOne(
          { email },
          {
            $setOnInsert: {
              email,
              name: profile.name || "",
              image: profile.picture || null,
              createdAt: new Date()
            }
          },
          { upsert: true }
        );
      }
      if (user) {
        token.email = user.email;
        token.name = user.name || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user = { email: token.email, name: token.name || "" };
      }
      return session;
    }
  }
};
