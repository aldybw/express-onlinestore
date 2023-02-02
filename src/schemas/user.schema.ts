import { z, ZodType } from "zod";

export const bodyUserSchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4, "Password should have minimum 4 characters"),
      passwordConfirmation: z
        .string()
        .min(4, "Password should have minimum 4 characters"),
    })
    .superRefine(({ passwordConfirmation, password }, ctx) => {
      if (passwordConfirmation !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});

export type bodyUserSchema = z.infer<typeof bodyUserSchema>;
