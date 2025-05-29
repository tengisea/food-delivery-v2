import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const connectDatabase = async () => {
  const url = process.env.MDB_CONNECTION_URL;
  if (!url) throw new Error("❌ MDB_CONNECTION_URL not found!");

  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
  }
};

connectDatabase();
export { connectDatabase };