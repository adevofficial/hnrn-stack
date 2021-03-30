import React, { FC } from "react";
import { Button } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Router, Link } from "@reach/router";
import LoginPage from "./pages/LoginPage";
const { Header, Content, Footer } = Layout;

const App = () => (
  <Router>
    <LoginPage path="/" />
  </Router>
);

export default App;
