import { z, ZodType } from "zod";

export const registerBodyUserSchema = z.object({
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

export const loginBodyUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4, "Password should have minimum 4 characters"),
  }),
});

export type registerBodyUserSchema = z.infer<typeof registerBodyUserSchema>;
export type loginBodyUserSchema = z.infer<typeof loginBodyUserSchema>;
