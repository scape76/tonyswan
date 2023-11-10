import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getEnvOrThrow } from "@/utils/getEnvOrThrow";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getEnvOrThrow("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvOrThrow("GOOGLE_CLIENT_SECRET"),
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
