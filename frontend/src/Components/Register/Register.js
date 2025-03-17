import axios from "axios";
import React from "react";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../Button/Button";

const getExpiresDateByMinutes = (timestampDate) => {
  const diff = timestampDate.getTime() - new Date().getTime();
  const expiresOnMinutes = diff / (1000 * 60 * 60);
  console.log(expiresOnMinutes);
  return expiresOnMinutes;
};

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmpassword: "",
    },
  });
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onRegister = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/register",
        data
      );
      console.log(new Date(res.data.expiresIn));
      if (
        signIn({
          token: res.data.token,
          expiresIn: getExpiresDateByMinutes(new Date(res.data.expiresIn)),
          tokenType: "Bearer",
          authState: { name: res.data.name },
        })
      ) {
        toast.success("Registration successfull, Loggin in");
        navigate("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <RegisterStyled>
      <form className="register" onSubmit={handleSubmit(onRegister)}>
        <h1>Register</h1>
        <div className="input-control">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <p> {errors.name && "Name is required"}</p>
        </div>
        <div className="input-control">
          <input
            type="text"
            name={"username"}
            placeholder="Username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="input-control">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          <p> {errors.password && errors.password.message}</p>
        </div>
        <div className="input-control">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmpassword", {
              required: true,
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          <p> {errors.confirmpassword && errors.confirmpassword.message}</p>
        </div>
        <Link to="/login">Already have an account?</Link>
        <div className="submit-btn">
          <Button
            type={"submit"}
            name={"Register"}
            bPad={".8rem 1.6rem"}
            bRad={"10px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />
        </div>
      </form>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .register {
    padding: 2rem 1.5rem;
    width: 374px;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    h1 {
      align-self: center;
    }
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
    .submit-btn {
      align-self: center;
      button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
          background: var(--color-green) !important;
        }
      }
    }
  }
`;

export default Register;
