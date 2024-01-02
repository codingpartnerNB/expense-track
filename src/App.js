import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./components/Layout/Home";
import UpdateProfile from "./components/Layout/UpdateProfile";
import AuthContext from "./store/auth-context";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/Layout/ForgotPassword";
import Expenses from "./components/Expenses/Expenses";
import ExpenseForm from "./components/Expenses/ExpenseForm";

const expenseData = [];
function App() {
  const authCtx = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = useState(false);
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route
            path="home"
            element={authCtx.isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="update"
            element={
              authCtx.isLoggedIn ? <UpdateProfile /> : <Navigate to="/" />
            }
          />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route
            path="expenses"
            element={
              authCtx.isLoggedIn ? (
                cartIsShown ? (
                  <ExpenseForm expenseData={expenseData} onHideCart={hideCartHandler} />
                ) : (
                  <Expenses expenseData={expenseData} onShowCart={showCartHandler} />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
