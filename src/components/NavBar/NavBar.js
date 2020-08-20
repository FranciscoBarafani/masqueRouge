import React from "react";
import { Input, Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Row justify="space-between">
        <Col span={4}>
          <h3>Icono</h3>
        </Col>
        <Col span={8}>
          <Input placeholder="Buscar..." />
        </Col>
        <Col span={2}>
          <ShoppingCartOutlined style={{ fontSize: 25 }} />
        </Col>
        <Col span={2}>
          <h3>Usuario</h3>
        </Col>
      </Row>
    </div>
  );
}
