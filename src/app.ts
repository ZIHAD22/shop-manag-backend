import express from "express";
import cors from "cors";
import prisma from "./config/db";
import { shopOwnerRouter } from "./modules/shopOwner/shopOwner.routes";

const app = express();
const PORT = process.env.PORT || 3000;

const connectToDB = async () => {
  try {
    // console.log(process.env.DATABASE_URL);
    await prisma.$connect();
    console.log("DB Connected successfully!");
  } catch (e) {
    console.log("DB connection Fails!");
  }
};

connectToDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/shopowner", shopOwnerRouter);

// Sample route
app.get("/api/v1", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

export default app;
