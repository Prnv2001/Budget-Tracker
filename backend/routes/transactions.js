const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const passport = require("passport");

const router = require("express").Router();

router
  .post(
    "/add-income",
    passport.authenticate("jwt", { session: false }),
    addIncome
  )
  .get(
    "/get-incomes",
    passport.authenticate("jwt", { session: false }),
    getIncomes
  )
  .delete(
    "/delete-income/:id",
    passport.authenticate("jwt", { session: false }),
    deleteIncome
  )
  .post(
    "/add-expense",
    passport.authenticate("jwt", { session: false }),
    addExpense
  )
  .get(
    "/get-expenses",
    passport.authenticate("jwt", { session: false }),
    getExpense
  )
  .delete(
    "/delete-expense/:id",
    passport.authenticate("jwt", { session: false }),
    deleteExpense
  );

module.exports = router;
