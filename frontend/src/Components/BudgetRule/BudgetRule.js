import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { useState } from "react";
import { Notification } from "@mantine/core";

function BudgetRule() {
    const { totalBalance } = useGlobalContext();
    const [checkState, setCheckState] = useState({
        title: "",
        amount: "",
        description: "",
    });

    const { title, amount, category } = checkState;
    const [showNotification1, setShowNotification1] = useState(false);
    const [showNotification2, setShowNotification2] = useState(false);
    const [showNotification3, setShowNotification3] = useState(false);
    const [showNotification4, setShowNotification4] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (category === "Needs" && Number(amount) > totalBalance() * 50 / 100) {
            setShowNotification1(true);
            setTimeout(() => {
                setShowNotification1(false);
            }, 5000);
        }
        else if (category === "Needs" && Number(amount) < totalBalance() * 50 / 100) {
            setShowNotification2(true);
            setTimeout(() => {
                setShowNotification2(false);
            }, 5000);
        }
        else if (category === "Wants" && Number(amount) > totalBalance() * 30 / 100) {
            setShowNotification3(true);
            setTimeout(() => {
                setShowNotification3(false);
            }, 5000);
        }
        else {
            setShowNotification4(true);
            setTimeout(() => {
                setShowNotification1(false);
            }, 5000);
        }
    };

    const handleInput = (name) => (e) => {
        setCheckState({ ...checkState, [name]: e.target.value });
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Future Expense Checker</h1>
                <h2 className="total-income">
                    Total Balance: <span>₹{totalBalance()}</span>
                </h2>
                <h6 className="description">
                    Enter your Future Expense to check whether it is affordable or not!
                </h6>

                <ExpenseFormStyled onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="text"
                            value={title}
                            name={"title"}
                            placeholder="Expense Title"
                            onChange={handleInput("title")}
                        />
                    </div>
                    <div className="input-control">
                        <input
                            value={amount}
                            type="text"
                            name={"amount"}
                            placeholder={"Expense Amount"}
                            onChange={handleInput("amount")}
                        />
                    </div>

                    <div className="selects input-control">
                        <select
                            required
                            value={category}
                            name="category"
                            id="category"
                            onChange={handleInput("category")}
                        >
                            <option value="" disabled>
                                Select Option
                            </option>
                            <option value="Needs">Needs</option>
                            <option value="Wants">Wants</option>
                        </select>
                    </div>
                    <div className="submit-btn">
                        <Button
                            name={"Check"}
                            icon={plus}
                            bPad={".8rem 1.6rem"}
                            bRad={"30px"}
                            bg={"var(--color-accent"}
                            color={"#fff"}
                        />
                    </div>
                </ExpenseFormStyled>

                {showNotification1 && (
                    <Notification title="Exceeded Limit" color="red" shadow="xs" style={{ marginTop: "1rem" }} onClose={() => setShowNotification1(false)}>
                        Amount exceeds the limit for the "Needs" category! <br></br>Max amount : <span>₹{totalBalance() * 50 / 100}</span>
                    </Notification>)}
                {showNotification2 && (
                    <Notification title="Within Limit" color="green" shadow="xs" style={{ marginTop: "1rem" }} onClose={() => setShowNotification2(false)}>
                        Amount is within the limit for the "Needs" category! <br></br>Max amount : <span>₹{totalBalance() * 50 / 100}</span>
                    </Notification>)}
                {showNotification3 && (
                    <Notification title="Exceeded Limit" color="red" shadow="xs" style={{ marginTop: "1rem" }} onClose={() => setShowNotification3(false)}>
                        Amount exceeds the limit for the "Wants" category! <br></br>Max amount : <span>₹{totalBalance() * 30 / 100}</span>
                    </Notification>)}
                {showNotification4 && (
                    <Notification title="Exceeded Limit" color="green" shadow="xs" style={{ marginTop: "1rem" }} onClose={() => setShowNotification4(false)}>
                        Amount is within the limit for the "Wants" category! <br></br>Max amount : <span>₹{totalBalance() * 30 / 100}</span>
                    </Notification>)}
            </InnerLayout>
        </IncomeStyled>
    );
}
const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .total-income {
    display: flex;
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
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default BudgetRule;
