import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import transactions from "./routes/transactions.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

//routes for transaction
app.use("/api", transactions);

//route for users
app.use("/api/users", userRoutes);
connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
