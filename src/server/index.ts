import { router } from "./trpc";
import { appRouter } from "./routers/_app";

type AppRouter = typeof appRouter;

export { appRouter, type AppRouter };
