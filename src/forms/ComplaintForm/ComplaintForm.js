import React from "react";
//Components
import { Form, Input, Button, Select, InputNumber } from "antd";

import "./ComplaintForm.scss";

export default function ComplaintForm(props) {
  const { setLocation } = props;

  const { Option } = Select;

  //This function gets the user location
  const getLocation = () => {
    var location = { latitude: 0, longitude: 0 };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;
        console.log(location);
        setLocation(location);
      });
    } else {
      setLocation(location);
    }
  };

  const onFinish = (values) => {
    getLocation();
    console.log(values);
  };

  return (
    <div className="complaint-form">
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item name="name">
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item name="lastname">
          <Input placeholder="Apellido" />
        </Form.Item>
        <Form.Item name="dni">
          <Input placeholder="DNI" />
        </Form.Item>
        <Form.Item name="phoneNumber">
          <Input placeholder="Teléfono" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="Tipo de Envío">
            <Option>Envío Express</Option>
            <Option>Envío en 7 días</Option>
          </Select>
        </Form.Item>
        <Form.Item name="street">
          <Input placeholder="Calle" />
        </Form.Item>
        <Form.Item name="cp">
          <Input placeholder="Código Postal" />
        </Form.Item>
        <Form.Item name="streetNumber">
          <InputNumber placeholder="Número" />
        </Form.Item>
        <Form.Item name="deck">
          <InputNumber placeholder="Piso" />
        </Form.Item>
        <Form.Item name="deparment">
          <InputNumber placeholder="Depto" />
        </Form.Item>
        <Form.Item name="province">
          <Select placeholder="Provincia">
            <Option>Córdoba</Option>
            <Option>Mendoza</Option>
          </Select>
        </Form.Item>
        <Form.Item name="city">
          <Input placeholder="Ciudad" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Probar Formulario</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
