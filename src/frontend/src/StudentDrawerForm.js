import { Button, Col, Drawer, Form, Input, Row, Select, Spin, notification } from "antd";
import { addNewStudent } from "./client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { successNotification } from "./notification";
const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
  const onClose = () => setShowDrawer(false);
  const [subMitting, setSubMitting] = useState(false);
  const onFinish = (student) => {
    setSubMitting(true);
    console.log(JSON.stringify(student, null, 2));
    addNewStudent(student)
      .then(() => {
        console.log("student added");
        onClose();
        successNotification(
          "Student added successfully",
          `${student.name} was added`
        );
        fetchStudents();
      })
      .catch((err) => {
        setSubMitting(false);
        console.log(err);
      })
      .finally(() => {
        setSubMitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };

  return (
    <>
      {/* {contextHolder} */}
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
