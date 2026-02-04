import z from "zod";

const createShopOwnerValidation = z.object({
  password: z.string(),
  shopOwner: z.object({
    name: z.string(),
    userName: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
});

export const shopOwnerValidation = {
  createShopOwnerValidation,
};
