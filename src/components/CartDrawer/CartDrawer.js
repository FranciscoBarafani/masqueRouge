import React from "react";
//Components
import { Drawer } from "antd";

import "./CartDrawer.scss";

export default function CartDrawer(props) {
  const { isVisible, setIsVisible } = props;

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <Drawer
      className="cartDrawer"
      title="Mi Carrito"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={isVisible}
      width={400}
    >
      <p>Producots</p>
    </Drawer>
  );
}
