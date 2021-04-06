import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "@reach/router";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { HBP_BASE_URL } from "configs";
import { storage } from "helpers/hbp-client";
import { useAuth } from "libraries/auth/useAuth";
import { get } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "urql";

const getUserQuery = gql`
  query getUser($id: uuid!) {
    users_by_pk(id: $id) {
      display_name
      avatar_url
      id
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($id: uuid!, $display_name: String) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { display_name: $display_name }
    ) {
      display_name
    }
  }
`;

interface UploadFile {
  onProgress: (event: { percent: number }) => void;
  onError: (event: Error, body?: Object) => void;
  onSuccess: (body: Object) => void;
  data: Object;
  filename: String;
  file: File;
  withCredentials: Boolean;
  action: String;
  headers: Object;
}

export default function BasicDetailsForm(props: RouteComponentProps) {
  const { user, signedIn } = useAuth();

  const [{ fetching, error, data }] = useQuery({
    query: getUserQuery,
    variables: { id: user?.id },
  });

  const [, updateUserData] = useMutation(updateUserMutation);

  const [formHook] = useForm();

  const onSubmit = useCallback(({ display_name }) => {
    updateUserData({ display_name, id: user?.id });
  }, []);

  useEffect(() => {
    const userData = get(data, "users_by_pk");
    if (!userData) return;
    formHook.setFieldsValue(userData);
  }, [data]);

  const [onSuccess, setOnSuccess] = useState(new Date().getTime());

  const uploadFile = async ({ file, onProgress, onSuccess, onError }: any) => {
    try {
      const response = await storage.put(
        `/public/${user?.id}`,
        file,
        { name: file.name, type: file.type },
        (percent: ProgressEvent) => {
          onProgress({ percent: (percent.loaded / percent.total) * 100 });
        }
      );
      onSuccess(response);
      setOnSuccess(new Date().getTime());
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div>
      <div>
        <Title level={4}>User Profile</Title>
        <Divider className="ant-divider-small" />

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
            name="display_name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder="Name"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          {/* <Form.Item
            name="avatar_url"
            label="Avatar"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          > */}
          <Row style={{ marginTop: 18 }}>
            <Col span={6}>
              <Avatar
                size={100}
                src={
                  <Image
                    height={100}
                    src={`${HBP_BASE_URL}/storage/o/public/${user?.id}?${onSuccess}`}
                  />
                }
              />
            </Col>
            <Col>
              <Upload
                listType="picture-card"
                customRequest={uploadFile}
                maxCount={1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Col>
          </Row>
          {/* </Form.Item> */}
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
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
