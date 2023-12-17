import * as z from "zod";

const stringToNumberTest = (message: string) =>
  z
    .any()
    .refine(
      (data) => {
        return typeof data === "string" || typeof data === "number";
      },
      {
        message: "Input must be a string or a number",
      }
    )
    .transform((data) => {
      if (typeof data === "string") {
        if (/^\d+$/.test(data)) {
          return Number(data);
        } else {
          throw new Error("String must contain only digits");
        }
      }
      return data as number;
    });

const biodataSchema = z.object({
  age: stringToNumberTest("It doesnt look like a real age number"),
  gender: z.enum(["MALE", "FEMALE"]),
  height: stringToNumberTest("It doesnt look like a real height number"),
  weight: stringToNumberTest("It doesnt look like a real weight number"),
});

const usBiodataSchema = z.object({
  age: stringToNumberTest("It doesnt look like a real age number"),
  gender: z.enum(["MALE", "FEMALE"]),
  feet: stringToNumberTest("It doesnt look like a real feet number"),
  inches: stringToNumberTest("It doesnt look like a real inches number"),
  weight: stringToNumberTest("It doesnt look like a real weight number"),
});

export { biodataSchema, usBiodataSchema };
