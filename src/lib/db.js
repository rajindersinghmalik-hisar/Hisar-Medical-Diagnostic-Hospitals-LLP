import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI); // No options needed in Mongoose 7+
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Let Next.js API route handle it
  }
};

export default connectDB;
