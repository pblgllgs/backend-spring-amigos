import { useEffect, useState } from "react";
import "./App.css";
import { deleteStudent, getAllStudents } from "./client";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Empty,
  Layout,
  Menu,
  Popconfirm,
  Radio,
  Spin,
  Table,
  Tag,
} from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  LoadingOutlined,
  PieChartOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StudentDrawerForm from "./StudentDrawerForm";
import { errorNotification, successNotification } from "./notification";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const TheAvatar = ({ name }) => {
  let trim = name.trim();
  if (trim.length === 0) {
    return <Avatar icon={<UserOutlined />} />;
  }
  const split = trim.split(" ");
  if (split.length === 1) {
    return <Avatar>{name.charAt(0)}</Avatar>;
  }
  return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>;
};

const removeStudent = (studentId, callback) => {
  deleteStudent(studentId)
    .then(() => {
      successNotification("Student Deleted", `Student ${studentId} deleted`);
      callback();
    })
    .catch((err) => {
      err.response.json().then((res) => {
        errorNotification(
          "There was an issue",
          `${res.message}[${res.status}][${res.error}]`
        );
      });
    });
};

const columns = (fetchStudents) => [
  {
    title: "Image",
    dataIndex: "avatar",
    key: "avatar",
    render: (text, student) => {
      return <TheAvatar name={student.name} />;
    },
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sortDirections: ["descend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, student) => {
      return (
        <Radio.Group>
          <Popconfirm
            placement="topRight"
            title={`Are you shure to delete ${student.name}`}
            onConfirm={() => removeStudent(student.id, fetchStudents)}
            okText="Yes"
            cancelText="No"
          >
            <Radio.Button value="small">Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button value="small">Edit</Radio.Button>
        </Radio.Group>
      );
    },
  },
];

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const { Header, Content, Footer, Sider } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [size, setSize] = useState("large");

  const fetchStudents = async () => {
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setTimeout(() => {
          setFetching(false);
        }, 250);
      })
      .catch((err) => {
        err.response.json().then((res) => {
          errorNotification(
            "There was an issue",
            `${res.message} fetching ${res.path} with code [${res.status}][${res.error}]`,
          );
        });
      })
      .finally(() => {
        return setFetching(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />;
    }
    if (students.length <= 0) {
      return <Empty />;
    }
    return (
      <>
        <StudentDrawerForm
          setShowDrawer={setShowDrawer}
          showDrawer={showDrawer}
          fetchStudents={fetchStudents}
        />
        <Table
          dataSource={students}
          columns={columns(fetchStudents)}
          bordered
          sortDirections={["ascend" | "descend"]}
          title={() => (
            <>
              <Button
                onClick={() => setShowDrawer(!showDrawer)}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size={size}
                style={{ marginRight: "10px" }}
              >
                Add new student
              </Button>
              <Tag>Number of students</Tag>
              <Badge count={students.length} showZero color="#faad14" />
            </>
          )}
          footer={() => "Users in the system"}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 500 }}
          rowKey={(student) => student.id}
        />
      </>
    );
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {renderStudents()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by pblgllgs
        </Footer>
      </Layout>
    </Layout>
  );
}
export default App;
