import { Button, Col, Drawer, Form, Input, Row, Select, Spin } from "antd";
import { addNewStudent } from "./client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { errorNotification, successNotification } from "./notification";
const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
  const onClose = () => setShowDrawer(false);
  const [subMitting, setSubmitting] = useState(false);
  const onFinish = (student) => {
    setSubmitting(true);
    console.log(JSON.stringify(student, null, 2));
    addNewStudent(student)
      .then(() => {
        console.log("student added");
        onClose();
        successNotification(
          "Student successfully added",
          `${student.name} was added to the system`
        );
        fetchStudents();
      })
      .catch((err) => {
        console.log(err);
        err.response.json().then((res) => {
          console.log(res);
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`,
            "bottomLeft"
          );
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };

  return (
    <>
      <Drawer
        title="Create a new student"
        width={720}
        onClose={onClose}
        open={showDrawer}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input placeholder="Enter a name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Enter a email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input your gender!",
                  },
                ]}
              >
                <Select placeholder="Please select a gender">
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                  <Option value="OTHER">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>{subMitting && <Spin indicator={antIcon} />}</Row>
        </Form>
      </Drawer>
    </>
  );
}
export default StudentDrawerForm;
