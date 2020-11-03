import React, { useState, useEffect } from "react";
//Components
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Modal,
  Result,
  message,
} from "antd";
import firebase from "../../utils/Firebase";

import "./ComplaintForm.scss";

const db = firebase.firestore(firebase);

export default function ComplaintForm(props) {
  const [isVisible, setisVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { disabled } = props;

  const { Option } = Select;

  useEffect(() => {
    getLocation();
  }, []);

  //This function gets the user location
  const getLocation = async () => {
    var location = { latitude: 0, longitude: 0 };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;
        setLocation(location);
      });
    } else {
      setLocation(location);
    }
  };

  //Post Complaint function - Parameters: Form Values, User's location
  const postComplaint = (complaint, location) => {
    let date = new Date();
    var finalComplaint = { ...complaint, location, date };
    db.collection("complaints")
      .add(finalComplaint)
      .then(() => {
        setisVisible(true);
      })
      .catch(() =>
        message.error(
          "Error al procesar pedido, por favor intentelo nuevamente."
        )
      );
    setIsLoading(false);
  };

  //Executes when form is finished and correct
  const onFinish = async (complaint) => {
    complaint.status = "pending";
    setIsLoading(true);
    postComplaint(complaint, location);
  };

  return (
    <div className="complaint-form">
      <Modal visible={isVisible} footer={false} closable={false}>
        <Result
          status="success"
          title="Tu pedido ha sido confirmado"
          subTitle="Nos contactaremos contigo en las próximas horas para enviarte la información del pago."
          extra={[
            <Button key="buy" onClick={() => setisVisible(false)}>
              Ok
            </Button>,
          ]}
        />
      </Modal>
      <Form wrapperCol={{ span: 24 }} onFinish={onFinish}>
        <Row gutter={10}>
          <Col>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Por favor introduce tu nombre" },
              ]}
            >
              <Input placeholder="Nombre" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Por favor introduce tu apellido" },
              ]}
            >
              <Input placeholder="Apellido" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col>
            <Form.Item
              name="id"
              rules={[
                { required: true, message: "Por favor introduce tu DNI" },
              ]}
            >
              <Input placeholder="Nro Documento" maxLength={8} type="number" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Por favor introduce tu mail" },
              ]}
            >
              <Input placeholder="Correo electronico" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col>
            <Form.Item
              name="street"
              rules={[
                { required: true, message: "Por favor introduce la calle" },
              ]}
            >
              <Input placeholder="Calle" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="number"
              rules={[
                {
                  required: true,
                  message: "Por favor introduce el número de calle",
                },
              ]}
            >
              <Input placeholder="Numero" type="number" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="deck">
              <Input placeholder="Piso" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="deliverType"
          rules={[
            {
              required: true,
              message: "Por favor  seleccione el tipo de envío",
            },
          ]}
        >
          <Select placeholder="Tipo de Envío">
            <Option value="express">Envío Express (Hasta 24 horas)</Option>
            <Option value="normal">Envío Normal (Hasta 7 días hábiles)</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Por favor introduce tu número de teléfono",
            },
          ]}
        >
          <Input placeholder="Número de Teléfono" />
        </Form.Item>
        <Row>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              disabled={disabled}
            >
              Confirmar Pedido
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}
