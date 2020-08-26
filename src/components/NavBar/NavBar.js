import React from "react";
import { Input, Col, Row, Button, Dropdown, Menu } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar() {
  const { Search } = Input;

  const menu = (
    <Menu>
      <Menu.Item>
        <p>Menu 1</p>
      </Menu.Item>
      <Menu.Item>
        <p>Menu 2</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="nav-bar">
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <h3>MasqueRouge</h3>
        </Col>
        <Col span={8}>
          <Search placeholder="Buscar..." enterButton />
        </Col>
        <Col span={4}>
          <Button
            shape="circle"
            icon={<UserOutlined style={{ fontSize: 25, color: "white" }} />}
          />
          <Button
            icon={
              <ShoppingCartOutlined style={{ fontSize: 25, color: "white" }} />
            }
          />
          <Dropdown placement="bottomRight" overlay={menu}>
            <Button
              icon={<MenuOutlined style={{ fontSize: 25, color: "white" }} />}
            />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
