import express, { application } from "express";
import {
  addExpense,
  deleteExpense,
  getExpense,
} from "../controllers/expenses.js";
import { addIncome, deleteIncome, getIncomes } from "../controllers/incomes.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
//income routes
router.post("/add-income", protectRoute, addIncome);
router.get("/get-income", protectRoute, getIncomes);
router.get("/delete-income", protectRoute, deleteIncome);

//expense routes
router.post("/add-expense", protectRoute, addExpense);
router.get("/get-expense", protectRoute, getExpense);
router.get("/delete-expense", protectRoute, deleteExpense);

export default router;
