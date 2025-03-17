import axios from "axios";
import React, { useContext, useState } from "react";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income, token) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios
      .post(`${BASE_URL}add-income`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes(token);
  };

  const getIncomes = async (token) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(`${BASE_URL}get-incomes`, config);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id, token) => {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`, config);
    getIncomes(token);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income, token) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios
      .post(`${BASE_URL}add-expense`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses(token);
  };

  const getExpenses = async (token) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(`${BASE_URL}get-expenses`, config);
    setExpenses(response.data);
    console.log("get Expenses", response.data);
  };

  const deleteExpense = async (id, token) => {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`, config);
    getExpenses(token);
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
