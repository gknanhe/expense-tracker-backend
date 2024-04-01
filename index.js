import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import transactions from "./routes/transactions.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", transactions);

connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
