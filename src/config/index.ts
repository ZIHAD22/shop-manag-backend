import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const { DATABASE_URL, PORT, ACCESS_SECRET, REFRESH_SECRET } = process.env;
export default {
  port: PORT || 3000,
  database_url: DATABASE_URL,
  access_secret: ACCESS_SECRET,
  refresh_secret: REFRESH_SECRET,
};
