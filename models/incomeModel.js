import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },

    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },

    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", IncomeSchema);

export default Income;
