import "chart.js/auto";
import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Bar } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const BarChart = ({ date1, date2, date3, date4, expense1, expense2 }) => {
  if (!date1 || !date2 || !date3 || !date4) {
    return "Please select two date ranges";
  }
  const frmt = (date) => format(date, "MM/dd/yyyy");

  const data = {
    labels: [
      `${frmt(date1)} - ${frmt(date2)}`,
      `${frmt(date3)} - ${frmt(date4)}`,
    ],
    datasets: [
      {
        label: "Expenses",
        data: [expense1, expense2],
        backgroundColor: ["#f0ad4e", "#f0ad4e"],
        barThickness: 50,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <ChartStyled>
      <Bar data={data} options={options} />
    </ChartStyled>
  );
};

function Analysis() {
  const [state, setState] = useState({
    selection1: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection1",
    },
    selection2: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection2",
    },
  });
  const { expenses, getExpenses } = useGlobalContext();
  const authHeader = useAuthHeader();

  function calculatePercentageChange(oldValue, newValue) {
    const percentageChange = ((newValue - oldValue) / oldValue) * 100;
    return percentageChange;
  }

  const filterArray = (startDate, endDate) => {
    console.log(startDate, endDate, expenses);
    const filteredArray = expenses.filter((obj) => {
      const objDate = new Date(obj.date);
      return objDate >= startDate && objDate <= endDate;
    });
    return filteredArray;
  };

  const sum1 = filterArray(
    state.selection1.startDate,
    state.selection1.endDate
  ).reduce((total, obj) => total + obj.amount, 0);
  const sum2 = filterArray(
    state.selection2.startDate,
    state.selection2.endDate
  ).reduce((total, obj) => total + obj.amount, 0);

  useEffect(() => {
    getExpenses(authHeader());
  }, []);

  const changePercentage = calculatePercentageChange(sum1, sum2).toFixed(2);

  return (
    <RatioStyled>
      <div className="container">
        <h1>Analysis</h1>
        {/* <h2 className="total-income">
          Total Expense: <span>₹{totalExpenses()}</span>
        </h2> */}
        <div className="group">
          <div className="income-content">
            <div className="form-container">
              <DateRangePicker
                onChange={(item) => setState({ ...state, ...item })}
                ranges={[state.selection1, state.selection2]}
              />
            </div>
            <div className="chart">
              <BarChart
                date1={state.selection1.startDate}
                date2={state.selection1.endDate}
                date3={state.selection2.startDate}
                date4={state.selection2.endDate}
                expense1={sum1}
                expense2={sum2}
              />
            </div>
          </div>
          <h2
            style={{
              color: changePercentage < 0 ? "green" : "red",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {isFinite(changePercentage)
              ? `There is a ${changePercentage}%
        ${changePercentage < 0 ? "decrease" : "increase"} in expenses`
              : "Cannot calculate change in expenses as there is no data for the selected date range"}
          </h2>
        </div>
      </div>
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
  flex-direction: column;
  height: 100%;
  overflow: auto;
  .container {
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .group {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-evenly;
    }
    h1 {
      justify-self: start;
      align-self: start;
    }
  }

  .chart {
    width: 100%;
    height: 30vh;
  }
  .income-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .incomes {
      flex: 1;
    }
    .form-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

export default Analysis;
