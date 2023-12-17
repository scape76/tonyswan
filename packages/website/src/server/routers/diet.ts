import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { Gender, prisma } from "@tonyswan/db";
import { biodataSchema } from "@/utils/schema/diet";

const dietRouter = router({
  saveBiodata: protectedProcedure
    .input(
      z.object({
        age: z.number(),
        gender: z.enum(["MALE", "FEMALE"]),
        height: z.number(),
        weight: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx.session;
      const { gender } = opts.input;

      const bioData = await prisma.bioData.upsert({
        where: {
          userId: user.id,
        },
        create: {
          userId: user.id,
          ...opts.input,
          gender: gender.toUpperCase() as Gender,
        },
        update: {
          ...opts.input,
          gender: gender.toUpperCase() as Gender,
        },
      });

      return bioData;
    }),
});

export { dietRouter };
