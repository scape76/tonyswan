import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getEnvOrThrow } from "@/utils/getEnvOrThrow";
import { prisma } from "@tonyswan/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: getEnvOrThrow("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvOrThrow("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    async session({ user, token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ user, token, account }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "",
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }

        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export { authOptions };
