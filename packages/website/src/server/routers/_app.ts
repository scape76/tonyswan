import { z } from "zod";
import { procedure, router } from "../trpc";
import { gymRouter } from "./gym";

const appRouter = router({
  hello: procedure
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
  gym: gymRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
export { appRouter };
