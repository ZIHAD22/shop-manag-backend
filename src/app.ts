import express from "express";
import cors from "cors";
import prisma from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

const connectToDB = async () => {
  try {
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

// Sample route
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

export default app;
