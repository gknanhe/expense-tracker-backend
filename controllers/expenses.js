import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    // console.log(req.body);
    const formatedDate = new Date(date);
    console.log("date", formatedDate);
    const expense = Expense({
      title,
      amount,
      category,
      description,
      date: formatedDate,
    });

    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    await expense.save();
    // console.log(income);

    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.log("Error in addExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.find().sort({ createdAt: -1 });

    res.status(200).json(expense);
  } catch (error) {
    console.log("Error in getExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findOneAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    console.log("Error in deleteExpense controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
