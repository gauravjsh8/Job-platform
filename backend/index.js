import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { jobRouter } from "./routes/jobRoutes.js";
import { contactRouter } from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Job-Platform");
});

const PORT = process.env.PORT || 3001;

app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/messages", contactRouter);

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
