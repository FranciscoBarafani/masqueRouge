import React from "react";
//Components
import { Drawer, Button } from "antd";
import CartList from "../CartList";

import "./CartDrawer.scss";

export default function CartDrawer(props) {
  const { isVisible, setIsVisible, cart, removeProduct, increaseProductQuantity,decreaseProductQuantity } = props;

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
      <CartList 
      cart={cart} 
      removeProduct={removeProduct} 
      increaseProductQuantity={increaseProductQuantity} 
      decreaseProductQuantity={decreaseProductQuantity}/>
      <div className="buy-btn">
      <Button type="primary">Comprar</Button>
      </div>
    </Drawer>
  );
}
