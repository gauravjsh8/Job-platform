import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { jobRouter } from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Job-Platform");
});

const PORT = process.env.PORT || 3001;

app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
