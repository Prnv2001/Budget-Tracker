import { expenses, money, stocks, transactions, trend,piggy } from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Incomes",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Expenses",
    icon: expenses,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Ratio",
    icon: stocks,
    link: "/ratio",
  },
  {
    id: 5,
    title: "Analysis",
    icon: money,
    link: "/analysis",
  },
  {
    id: 6,
    title: "Future Expense Checker",
    icon: piggy,
    link: "/budgetRule",
  },
];
