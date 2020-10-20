import React, { useState, useEffect } from "react";
//Forms
import ComplaintForm from "../../forms/ComplaintForm";
import CartList from "../../components/CartList";
import { Row, Col, Modal, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./checkOut.scss";

export default function CheckOut(props) {
  const {  cart,increaseProductQuantity, decreaseProductQuantity, removeProduct } = props; 
  const [isVisible, setIsVisible] = useState(false);

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

  

  return (
    <div className="checkout">
      <Modal visible={isVisible} closable={false} footer={<Button type="primary" onClick={() => setIsVisible(false)}>Entiendo</Button>}>
        <h4>Ayuda</h4>
        <p>Mucho Texto</p>
      </Modal>
      <div className="checkout-body">
        <Row justify="center" align="top">
          <Col sm={12}>
        <div className="checkout-body-form">
          <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>         
             <h2>Confirmación de Pedido </h2>
          <Button onClick={() => setIsVisible(true)} style={{marginLeft: 20, marginBottom: 10}}><QuestionCircleOutlined style={{fontWeight: 25}}/></Button>
          </div>
        <ComplaintForm />
        </div>
        </Col>
        <Col sm={8}>
        <div className="checkout-body-cart">
          <h2>Mi Carrito</h2>
          <CartList  cart={cart} 
          setRefresh={setRefresh}
          refresh={refresh}
      removeProduct={removeProduct} 
      increaseProductQuantity={increaseProductQuantity} 
      decreaseProductQuantity={decreaseProductQuantity}/>
      <h3>Total: ${total}</h3>
        </div>
        </Col>
        </Row>
      </div>
    </div>
  );
}
