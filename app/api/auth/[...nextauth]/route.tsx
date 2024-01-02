import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  session: {
    maxAge: 24 * 60 * 60, // 1 hour for session
  },
  pages: {
    signOut: "/",
    error: "/error",
  },
  providers: [
    LineProvider({
      clientId: process.env.NEXT_PUBLIC_LINE_CLIENT_ID!!,
      clientSecret: process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET!!,
      profile: (profile) => {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub!!;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
