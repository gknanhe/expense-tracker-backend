import Income from "../models/incomeModel.js";
import User from "../models/userModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id;
    console.log(userId);
    const formatedDate = new Date(date);
    // console.log("date", formatedDate);
    const income = Income({
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

    await income.save();

    //add to user model

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.incomes.push(income._id);
    await user.save();

    // console.log(income);

    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.log("Error in addIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getIncomes = async (req, res) => {
  console.log("request comming");
  try {
    const userId = req.user._id;

    const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    console.log("Error in getIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.query;
    console.log(id);
    const deletedIncome = await Income.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    //remove from usermodel too

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.incomes.indexOf(id);
    if (index !== -1) {
      user.incomes.splice(index, 1);
      await user.save();
    }
    console.log("income deleted");
    res.status(200).json({ message: "Income deleted" });
  } catch (error) {
    console.log("Error in deleteIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
