import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const { DATABASE_URL, PORT } = process.env;
export default {
  port: PORT || 3000,
  database_url: DATABASE_URL,
};
