import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id;
    const formatedDate = new Date(date);
    console.log("date", formatedDate);
    const expense = Expense({
      title,
      amount,
      category,
      description,
      date: formatedDate,
      user: userId,
    });

    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    await expense.save();
    // console.log(income);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.expenses.push(expense._id);
    await user.save();

    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.log("Error in addExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const expense = await Expense.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(expense);
  } catch (error) {
    console.log("Error in getExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.query;
    const deletedExpense = await Expense.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    //remove from usermodel too

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.expenses.indexOf(id);
    if (index !== -1) {
      user.expenses.splice(index, 1);
      await user.save();
    }

    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    console.log("Error in deleteExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
