import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import config from "./index";

const connectionString = `${config.database_url}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter: adapter,
  omit: {
    auth: {
      password: true,
    },
  },
});

export default prisma;
