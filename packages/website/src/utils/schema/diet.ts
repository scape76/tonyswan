import * as z from "zod";

const biodataSchema = z.object({
  age: z.number().min(1).max(100),
  gender: z.enum(["male", "female"]),
  height: z.number().min(1),
  weight: z.number().min(1),
});

export { biodataSchema };
