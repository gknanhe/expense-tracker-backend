import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected MongoDB");
  } catch (error) {
    console.log("Error in connecting to mongoDB", error.message);
  }
};

export default connectMongoDB;
