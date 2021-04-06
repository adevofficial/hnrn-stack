import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
const { Header, Footer, Sider, Content } = Layout;

interface LayoutDashboardProps extends RouteComponentProps {
  children?: React.ReactNode;
}

export default function LayoutDashboard(props: LayoutDashboardProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Header className="header">
          <div
            className="logo"
            style={{
              float: "left",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "2rem",
              marginRight: "12px",
            }}
          >
            HNRN Stack
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0", background: "#fff" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item
                  onClick={() => navigate("/dashboard")}
                  icon={<HomeOutlined />}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  onClick={() => navigate("/dashboard/profile")}
                  icon={<UserOutlined />}
                >
                  Profile
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>HNRN Stack</Footer>
      </Layout>
    </div>
  );
}
