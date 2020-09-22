import React from "react";
import { Col, Row, Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar(props) {
  const { setIsVisible } = props;

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
          <Link to="/home">
            <h3>MasqueRouge</h3>
          </Link>
        </Col>
        <Col span={8}></Col>
        <Col span={4}>
          <Link to="/admin">
            <Button
              shape="circle"
              icon={<UserOutlined style={{ fontSize: 25, color: "white" }} />}
            />
          </Link>
          <Button
            icon={
              <ShoppingCartOutlined
                style={{ fontSize: 25, color: "white" }}
                onClick={() => setIsVisible(true)}
              />
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
