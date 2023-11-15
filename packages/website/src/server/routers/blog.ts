import { z } from "zod";
import { procedure, router } from "../trpc";

const blogRouter = router({
  create: procedure
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
});

export { blogRouter };
