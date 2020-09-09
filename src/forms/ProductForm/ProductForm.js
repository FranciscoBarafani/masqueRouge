import React from "react";
//Firebase
import firebase from "../../utils/Firebase";
//Components
import { Form, Input, InputNumber, Button } from "antd";

import "./ProductForm.scss";

export default function ProductForm() {
  const onFinish = () => {
    console.log("Form Fin");
  };

  return (
    <div className="form">
      <Form name="productForm" onFinish={onFinish}>
        <h3>Cargar Producto</h3>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Debes ingresar el nombre del producto.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Precio"
          rules={[
            {
              required: true,
              message: "Debes ingresar el precio del producto.",
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Crear Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
