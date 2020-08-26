import React from "react";
import { Input, Col, Row, Button } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar() {
  const { Search } = Input;

  return (
    <div className="nav-bar">
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <h3>MasqueRouge Project</h3>
        </Col>
        <Col span={8}>
          <Search placeholder="Buscar..." enterButton />
        </Col>
        <Col span={2}>
          <Button
            shape="circle"
            icon={<UserOutlined style={{ fontSize: 25, color: "white" }} />}
          />
          <Button
            icon={
              <ShoppingCartOutlined style={{ fontSize: 25, color: "white" }} />
            }
          />
        </Col>
      </Row>
    </div>
  );
}
