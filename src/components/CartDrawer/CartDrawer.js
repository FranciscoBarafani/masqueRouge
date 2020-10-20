import React, { useState, useEffect} from "react";
//Components
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import CartList from "../CartList";

import "./CartDrawer.scss";

export default function CartDrawer(props) {
  const { isVisible, setIsVisible, cart, removeProduct, increaseProductQuantity,decreaseProductQuantity } = props;
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

  //Calculate Total
  useEffect(() => {
    setTotal(getTotal(cart));
  }, [cart, total, increaseProductQuantity, decreaseProductQuantity, refresh])

  //Get Total
  const getTotal = (cart) => {
    console.log(cart);
    var total = 0;
    for(var i = 0; i < cart.length ; i++){
      total = total + cart[i].price * cart[i].quantity;
    }
    return total
  }


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
      refresh={refresh}
      setRefresh={setRefresh}
      removeProduct={removeProduct} 
      increaseProductQuantity={increaseProductQuantity} 
      decreaseProductQuantity={decreaseProductQuantity}/>
      <h3>Total: ${total}</h3>
      <div className="buy-btn">
        <Link to="/home/checkout">
      <Button type="primary" disabled={cart.length === 0} onClick={() => setIsVisible(false)}>Comprar</Button>
      </Link>
      </div>
    </Drawer>
  );
}
