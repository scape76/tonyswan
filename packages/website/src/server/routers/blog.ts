import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { prisma } from "@tonyswan/db";

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

export { blogRouter };
