import express from "express";
import cors from "cors";
import prisma from "./config/db";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();
const PORT = process.env.PORT || 3000;

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB Connected successfully!");
  } catch (e) {
    console.log(e);
    console.log("DB connection Fails!");
  }
};

connectToDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

// Sample route
app.get("/api/v1", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

app.use(globalErrorHandler);

export default app;
