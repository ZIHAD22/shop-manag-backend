import z, { email } from "zod";

const authLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export const authValidation = {
  authLogin,
};
