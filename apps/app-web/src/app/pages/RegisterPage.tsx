import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import { Button, Card, Form, Input, notification } from 'antd';
import { auth } from '@hnrn-stack/hbp-client';
import React, { useCallback } from 'react';

export default function RegisterPage(props: RouteComponentProps) {
  const onSubmit = useCallback(async ({ email, password, display_name }) => {
    try {
      await auth.register({
        email,
        password,
        options: { userData: { display_name } },
      });
      notification.error({
        message: 'Register',
        description: 'Account created successfully ;)',
      });
      navigate('/dashboard');
    } catch (error) {
      notification.error({
        message: 'Register',
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
            name="display_name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/login">Already had a account ?</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
