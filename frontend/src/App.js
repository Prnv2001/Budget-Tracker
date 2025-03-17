import React, { useMemo, useState } from "react";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Analysis from "./Components/Analysis/Analysis";
import Dashboard from "./Components/Dashboard/Dashboard";
import BudgetRule from "./Components/BudgetRule/BudgetRule";
import Expenses from "./Components/Expenses/Expenses";
import Income from "./Components/Income/Income";
import Login from "./Components/Login/Login";
import Navigation from "./Components/Navigation/Navigation";
import Orb from "./Components/Orb/Orb";
import Ratio from "./Components/Ratio/Ratio";
import Register from "./Components/Register/Register";
import { useGlobalContext } from "./context/globalContext";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";

function App() {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      case 4:
        return <Ratio />;
      case 5:
        return <Analysis />;
      case 6:
        return <BudgetRule />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth loginPath={"/login"}>
          <Navigation active={active} setActive={setActive} />
          <main>{<Outlet />}</main>
        </RequireAuth>
      ),
      children: [{ path: "/", element: displayData() }],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}
        >
          <RouterProvider router={router} />
        </AuthProvider>
        <ToastContainer />
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
