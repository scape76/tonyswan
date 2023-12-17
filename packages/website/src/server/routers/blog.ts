import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { prisma } from "@tonyswan/db";
import { TRPCError } from "@trpc/server";

const blogRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        body: z.any(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { user } = opts.ctx.session;
        const { name, body } = opts.input;

        const count = await getUserPostsCount(user.id);

        if (count >= 3) {
          throw new TRPCError({
            message: "You cannot have more than 3 blog posts.",
            code: "FORBIDDEN",
          });
        }

        const post = await prisma.post.create({
          data: {
            userId: user.id,
            name,
            body,
          },
        });

        return post;
      } catch (err) {
        console.log(err);
      }
    }),
  getUserPosts: protectedProcedure.query(async (opts) => {
    const { user } = opts.ctx.session;

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
      },
      take: 10,
    });

    return posts;
  }),
});

async function getUserPostsCount(userId: string) {
  const count = await prisma.post.count({
    where: {
      userId,
    },
  });

  return count;
}

export { blogRouter };
