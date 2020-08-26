import React from "react";
//Components
import { Row, Col, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <Row align="middle" justify="center">
        <Col span={6}>
          <h3>Subscribite a nuestro Newsletter</h3>
          <p>Informate de lo ultimo en nuestros productos y ofertas</p>
          <Input
            placeholder="Ingresa tu dirección e-mail"
            addonAfter={<MailOutlined />}
          />
        </Col>
        <Col span={4}>
          <h3>Servicio al Cliente</h3>
          <p>Seguimiento de mi pedido</p>
          <p>Cambios y devoluciones</p>
          <p>Términos y condiciones</p>
        </Col>
        <Col span={4}>
          <h3>Ayuda</h3>
          <p>Contactános</p>
          <p>Mail de contacto</p>
          <p>Número de contacto</p>
        </Col>
      </Row>
    </div>
  );
}
