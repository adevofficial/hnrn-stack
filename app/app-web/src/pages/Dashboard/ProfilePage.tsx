import { UserOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "@reach/router";
import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { useAuth } from "libraries/auth/useAuth";
import React, { useCallback } from "react";
import { useQuery } from "urql";

const getUserQuery = `
{
  users{
    display_name
    avatar_url
  }
}`;

export default function ProfilePage(props: RouteComponentProps) {
  const { user, signedIn } = useAuth();
  const onSubmit = useCallback(() => {}, []);
  const [result] = useQuery({ query: getUserQuery });
  console.log(signedIn);
  return (
    <div>
      <div>
        <Title level={5}>{user ? user?.display_name : ""}</Title>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          size="large"
          wrapperCol={{ span: 10 }}
        >
          <Form.Item
            name="display_name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
            <Button
              style={{ marginLeft: "8px" }}
              type="primary"
              className="login-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
