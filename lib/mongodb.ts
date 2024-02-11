import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("DB Connected");
  } catch (error) {
    throw new Error("DB connection failed!");
  }
};

export default connectDB;
