import Income from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    // console.log(req.body);
    const formatedDate = new Date(date);
    console.log("date", formatedDate);
    const income = Income({
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

    await income.save();
    // console.log(income);

    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.log("Error in addIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    console.log("Error in getIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await Income.findOneAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted" });
  } catch (error) {
    console.log("Error in deleteIncome controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
