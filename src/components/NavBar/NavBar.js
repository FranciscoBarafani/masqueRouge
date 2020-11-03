import React from "react";
import { Col, Row, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import "./NavBar.scss";

export default function NavBar(props) {
  const { setIsVisible } = props;

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
        </Col>
      </Row>
    </div>
  );
}
