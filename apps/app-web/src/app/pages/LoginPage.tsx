import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import { Button, Card, Checkbox, Form, Input, notification } from 'antd';
import { auth } from '@hnrn-stack/hbp-client';
import { useAuth } from '@hnrn-stack/auth';
import React, { useCallback } from 'react';

export default function LoginPage(props: RouteComponentProps) {
  const { setUser } = useAuth();
  const onSubmit = useCallback(async ({ email, password }) => {
    try {
      const loginUser = await auth.login({ email, password });
      setUser(loginUser.user);
      navigate('/dashboard');
    } catch (error) {
      notification.error({
        message: 'Login',
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
          <Form.Item
            name="password"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">Forgot password</Link>
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/register">Register now!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
