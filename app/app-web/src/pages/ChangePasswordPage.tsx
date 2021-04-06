import { LockOutlined } from "@ant-design/icons";
import {
  navigate,
  Redirect,
  RouteComponentProps,
  useParams,
} from "@reach/router";
import { Button, Card, Form, Input, notification } from "antd";
import { auth } from "helpers/hbp-client";
import { isEmpty } from "lodash";
import React, { useCallback } from "react";

export default function ChangePasswordPage(props: RouteComponentProps) {
  const params = useParams();

  const onSubmit = useCallback(
    async ({ password }) => {
      try {
        await auth.confirmPasswordChange(password, params.token);
        notification.success({
          message: "Update Password",
          description: "Password updated successfully",
        });
        navigate("/login");
      } catch (error) {
        notification.error({
          message: "Update Password",
          description: error.response.data.message,
        });
      }
    },
    [params]
  );

  if (isEmpty(params.token)) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <Card className="login-box">
        <Form
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          size="large"
          onFinish={onSubmit}
        >
          <Form.Item
            name="password"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            style={{ marginBottom: 10 }}
            rules={[
              {
                required: true,
                message: "Please input your confirm-password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
