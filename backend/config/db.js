import mongoose from "mongoose";

export const connectToDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database Successfully");
  } catch (error) {
    console.log("Failed to connect Database", error);
  }
};
