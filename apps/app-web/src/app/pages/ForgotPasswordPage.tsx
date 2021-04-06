import { UserOutlined } from '@ant-design/icons';
import { RouteComponentProps } from '@reach/router';
import { Button, Card, Form, Input, notification } from 'antd';
import { auth } from '@hnrn-stack/hbp-client';
import React, { useCallback } from 'react';

export default function ForgotPasswordPage(props: RouteComponentProps) {
  const onSubmit = useCallback(async ({ email }) => {
    try {
      await auth.requestPasswordChange(email);
      notification.success({
        message: 'Reset Password',
        description: 'Please check the mailbox.',
      });
    } catch (error) {
      notification.error({
        message: 'Reset Password',
        description: error.response.data.message,
      });
    }
  }, []);

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
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
