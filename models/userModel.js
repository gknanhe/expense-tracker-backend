import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
});

const User = mongoose.model("User", userSchema);

export default User;
