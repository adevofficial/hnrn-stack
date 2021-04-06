import { Router } from '@reach/router';
import LayoutDashboard from '@app-web/components/Dashboard/LayoutDashboard';
import ChangePasswordPage from '@app-web/pages/ChangePasswordPage';
import DashboardPage from '@app-web/pages/Dashboard/DashboardPage';
import ProfilePage from '@app-web/pages/Dashboard/ProfilePage';
import ForgotPasswordPage from '@app-web/pages/ForgotPasswordPage';
import RegisterPage from '@app-web/pages/RegisterPage';
import React from 'react';
import LoginPage from '@app-web/pages/LoginPage';

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
