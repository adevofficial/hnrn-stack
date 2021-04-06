import { UserOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Form, Input, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import { auth } from "helpers/hbp-client";
import React, { useCallback } from "react";

export default function ResetPasswordForm(props: RouteComponentProps) {
  const [formHook] = useForm();

  const onSubmit = useCallback(async ({ oldPassword, password }) => {
    try {
      await auth.changePassword(oldPassword, password);
      notification.success({
        message: "Reset Password",
        description: "Password updated successfully ;)",
      });
    } catch (error) {
      notification.error({
        message: "Reset Password",
        description: error.response.data.message,
      });
    }
    formHook.resetFields();
  }, []);

  return (
    <div>
      <div>
        <Divider />

        <Form
          form={formHook}
          name="normal_login"
          className="ant-form-vertical-custom"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          size="large"
          wrapperCol={{ span: 10 }}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { min: 8, message: "Password should have min 8 chars" },
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Old Password"
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { min: 8, message: "Password should have min 8 chars" },
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Password"
              type="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
              {
                required: true,
                message: "Please input your Confirm password!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
              type="password"
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
