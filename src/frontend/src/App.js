import { useEffect, useState } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import { Breadcrumb, Button, Empty, Layout, Menu, Spin, Table } from "antd";
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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
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
  // eslint-disable-next-line no-unused-vars
  const [size, setSize] = useState("large");

  const fetchStudents = async () => {
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
        setTimeout(() => {
          setFetching(false);
        }, 250);
      });
  };

  useEffect(() => {
    console.log("component is mounted");
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
        <StudentDrawerForm setShowDrawer={setShowDrawer} showDrawer={showDrawer} />
        <Table
          dataSource={students}
          columns={columns}
          bordered
          title={() => (
            <Button
              onClick={() => setShowDrawer(!showDrawer)}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size={size}
            >
              Add new student
            </Button>
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
