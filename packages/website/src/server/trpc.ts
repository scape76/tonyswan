import { auth } from "@/utils/auth/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { Session } from "next-auth";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
// Base router and procedure helpers

export type Context = { session: Session | null };
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ next, ctx }) => {
  const session = await auth();

  if (!session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
