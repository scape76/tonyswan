import * as z from "zod";

const blogSchema = z.object({
  name: z.string().min(2, "Post name is too short").max(32, "Post name should not exceed 32 characters"),
  body: z.any(),
});

export { blogSchema };
