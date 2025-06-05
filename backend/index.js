import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Job-Platform");
});

const PORT = process.env.PORT || 3001;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
