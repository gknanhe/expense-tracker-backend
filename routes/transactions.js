import express, { application } from "express";
import {
  addExpense,
  deleteExpense,
  getExpense,
} from "../controllers/expenses.js";
import { addIncome, deleteIncome, getIncomes } from "../controllers/incomes.js";

const router = express.Router();
//income routes
router.post("/add-income", addIncome);
router.get("/get-income", getIncomes);
router.get("/delete-income", deleteIncome);

//expense routes
router.post("/add-expense", addExpense);
router.get("/get-expense", getExpense);
router.get("/delete-expense", deleteExpense);

export default router;
