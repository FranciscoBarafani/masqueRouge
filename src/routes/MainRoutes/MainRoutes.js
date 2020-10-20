import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages
import Home from "../../pages/home";
import CheckOut from "../../pages/checkOut";

export default function MainRoutes(props) {
  const { addToCart, cart,increaseProductQuantity, decreaseProductQuantity, removeProduct } = props; 
  

  return (
    <Switch>
      <Route path="/home" exact>
        <Home addToCart={addToCart} />
      </Route>
      <Route path="/home/checkout" exact>
        <CheckOut cart={cart} 
      removeProduct={removeProduct} 
      increaseProductQuantity={increaseProductQuantity} 
      decreaseProductQuantity={decreaseProductQuantity}/>
      </Route>
    </Switch>
  );
}
