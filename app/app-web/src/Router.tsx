import { Router } from "@reach/router";
import LayoutDashboard from "components/Dashboard/LayoutDashboard";
import ChangePasswordPage from "pages/ChangePasswordPage";
import DashboardPage from "pages/Dashboard/DashboardPage";
import ProfilePage from "pages/Dashboard/ProfilePage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import RegisterPage from "pages/RegisterPage";
import React from "react";
import LoginPage from "./pages/LoginPage";

const AppRouter = () => (
  <Router>
    <LoginPage path="/" />
    <LoginPage path="login" />
    <RegisterPage path="register" />
    <LayoutDashboard path="dashboard">
      <DashboardPage path="/" />
      <ProfilePage path="profile" />
    </LayoutDashboard>
    <ForgotPasswordPage path="/forgot-password" />
    <ChangePasswordPage path="/change-password/:token" />
  </Router>
);

export default AppRouter;
