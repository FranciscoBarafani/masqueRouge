import React, { useState } from "react";
//Components
import { Row, Col, Button, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TagsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
//Firebase
import firebase from "../../utils/Firebase";
//Routes
import AdminRoutes from "../../routes/AdminRoutes";
//Forms
import LoginForm from "../../forms/LoginForm";

import "./AdminLayout.scss";

export default function AdminLayout() {
  const [user, setUser] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(null))
      .catch(() => console.log("Error al cerrar sesión."));
  };

  const toProducts = () => {
    window.history.pushState("", "", "/admin/products");
  };

  return (
    <div className="admin-layout">
      {user ? (
        <div>
          <div className="admin-layout_top-bar">
            <Button
              type="primary"
              onClick={() => setCollapsed(!collapsed)}
              style={{ marginBottom: 16 }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          <Row>
            <Col span={4}>
              <div style={{ width: 256 }}>
                <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={collapsed}
                >
                  <Menu.Item
                    key="1"
                    icon={<TagsOutlined />}
                    onClick={() => toProducts()}
                  >
                    Cargar Productos
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<LogoutOutlined />}
                    onClick={() => logOut()}
                  >
                    Cerrar Sesión
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col span={20}>
              <Row>
                <AdminRoutes />
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <Row justify="center" align="middle">
          <Col>
            <LoginForm setUser={setUser} />
          </Col>
        </Row>
      )}
    </div>
  );
}
