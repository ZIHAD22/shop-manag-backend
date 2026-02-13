import { z } from "zod";

const createShopOwnerValidation = z.object({
  password: z.string().min(6),
  shopOwner: z.object({
    name: z.string().min(3),
    email: z.email(),
    userName: z.string(),
    phone: z.string(),
  }),
});

const createAdminValidation = z.object({
  password: z.string().min(6),
  admin: z.object({
    name: z.string().min(3),
    email: z.email(),
    userName: z.string(),
    phone: z.string(),
  }),
});

const updateShopOwnerValidation = z.object({
  name: z.string().min(3).optional(),
  phone: z.string().optional(),
  profilePic: z.string().optional(),
});

export const userValidation = {
  createAdminValidation,
  createShopOwnerValidation,
  updateShopOwnerValidation,
};
