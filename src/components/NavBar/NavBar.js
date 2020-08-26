import React from "react";
import { Input, Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar() {
  const { Search } = Input;

  return (
    <div className="nav-bar">
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <h3>Sitio E-Commerce</h3>
        </Col>
        <Col span={8}>
          <Search placeholder="Buscar..." enterButton />
        </Col>
        <Col span={2}>
          <ShoppingCartOutlined style={{ fontSize: 25, color: "white" }} />
        </Col>
        <Col span={2}>
          <h3>Usuario</h3>
        </Col>
      </Row>
    </div>
  );
}
