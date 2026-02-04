import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import config from "./index";

const connectionString = `${config.database_url}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter: adapter,
});

export default prisma;
