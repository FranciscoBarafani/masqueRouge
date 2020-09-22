import React from "react";
//Components
import { Form, Input, Button, message } from "antd";
//Firebase
import firebase from "../../utils/Firebase";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setUser } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        message.success("Inicio de sesión correcto.");
        setUser(user);
      })
      .catch(() =>
        message.error(
          "Error al iniciar sesión, corrobore los datos ingresados."
        )
      );
  };

  return (
    <div className="login-form">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h3>Iniciar Sesión</h3>
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            { required: true, message: "Por favor introduce tu E-mail." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Por favor introduce tu contraseña." },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
