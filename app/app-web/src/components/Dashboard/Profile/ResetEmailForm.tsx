import { UserOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Form, Input, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { auth } from "helpers/hbp-client";
import { useAuth } from "libraries/auth/useAuth";
import { get } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from "urql";

const getUserQuery = gql`
  query getUser($id: uuid!) {
    users_by_pk(id: $id) {
      display_name
      avatar_url
      id
      account {
        email
      }
    }
  }
`;

export default function ResetEmailForm(props: RouteComponentProps) {
  const { user } = useAuth();
  const [formHook] = useForm();
  const [userEmail, setUserEmail] = useState();
  const [{ data }, reexecuteQuery] = useQuery({
    query: getUserQuery,
    variables: { id: user?.id },
  });

  const onSubmit = useCallback(async ({ email }) => {
    try {
      await auth.changeEmail(email);
      reexecuteQuery({ requestPolicy: "network-only" });
      notification.success({
        message: "Reset Email",
        description: "Email updated successfully ;)",
      });
    } catch (error) {
      notification.error({
        message: "Reset Email",
        description: error.response.data.message,
      });
    }
    formHook.resetFields();
  }, []);

  useEffect(() => {
    const userData = get(data, "users_by_pk.account.email");
    if (!userData) return;
    setUserEmail(userData);
  }, [data]);

  return (
    <div>
      <div>
        <Divider />
        <div style={{ display: "flex" }}>
          Current Email:{" "}
          <Title style={{ marginLeft: 12 }} level={5}>
            {" "}
            {userEmail}
          </Title>
        </div>

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
            name="email"
            label="Email"
            rules={[
              {
                validator: async (rule, value) => value === userEmail,
                message: "Please input a valid email",
              },

              { type: "email", message: "Please input a valid email" },
              { required: true, message: "Please input your email" },
            ]}
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
              Reset Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
