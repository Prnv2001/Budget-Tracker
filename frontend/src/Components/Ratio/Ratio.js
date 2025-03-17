import "chart.js/auto";
import React, { useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";

const BarChart = () => {
  const { totalIncome } = useGlobalContext();
  const data = {
    labels: [
      "50% income - Savings",
      "30% income - Emergency",
      "20% income - Expenses",
    ],
    datasets: [
      {
        label: "Income",
        data: [totalIncome() * 0.5, totalIncome() * 0.3, totalIncome() * 0.2],
        backgroundColor: ["#22bb33", "#f0ad4e", "#bb2124"],
        barThickness: 50,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: totalIncome(),
      },
    },
  };

  return (
    <ChartStyled>
      <Bar data={data} options={options} />
    </ChartStyled>
  );
};

function Ratio() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();
  const authHeader = useAuthHeader();
  useEffect(() => {
    getExpenses(authHeader());
  }, []);
  return (
    <RatioStyled>
      <InnerLayout>
        <h1>Ratio</h1>
        {/* <h2 className="total-income">
          Total Expense: <span>₹{totalExpenses()}</span>
        </h2> */}
        <div className="income-content">
          <div className="form-container">
            <BarChart />
          </div>
          {/* <div className="incomes">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              console.log(income);
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div> */}
        </div>
      </InnerLayout>
    </RatioStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  margin-inline: 4rem;
  margin-top: 2rem;
  border-radius: 20px;
  height: 100%;
`;

const RatioStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    height: 50vh;
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
    .form-container {
      width: 100%;
      height: 100%;
    }
  }
`;

export default Ratio;
