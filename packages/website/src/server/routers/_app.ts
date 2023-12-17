import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { blogRouter } from "./blog";
import { dietRouter } from "./diet";

const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  blog: blogRouter,
  diet: dietRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
export { appRouter };
