import React, { useState, useEffect } from "react";
import MainRoutes from "../../routes/MainRoutes";
//Components
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ChatButton from "../../components/ChatButton";
import CartDrawer from "../../components/CartDrawer";
import { message } from "antd";
//Firebase
import firebase from "../../utils/Firebase";
import { uniqBy, remove, findIndex } from "lodash";

export default function MainLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const [cart, setCart] = useState([]);  

  //Add to Cart 
  const addToCart = (newProduct) => {
    var newCart = cart;
    newCart.push(newProduct);
    var nonDup = uniqBy(newCart, `id`)
    if(nonDup.length !== newCart.length){message.info("El producto ya se encuentra en el carrito")} else {
      message.info("Producto agregado al carrito");
    }
    setCart(nonDup);     
};

  //Remove from Cart
  const removeProduct = (id) => {
    var newCart = remove(cart, n => {
      return n.id !== id
    });
    setCart(newCart);
  };


  //Increase Quantity - Returns JSON with the selected product with an extra quantity
  const increaseProductQuantity = (product) => {
    var newCart = cart;
    var index = findIndex(cart, n => {
      return n.id === product.id
    })
    newCart[index].quantity ++;
    setCart(newCart);
  }

  //Decrease Quantity - Returns JSON with the selected product with a minus quantity
  const decreaseProductQuantity = (product) => {
    var newCart = cart;
    var index = findIndex(cart, n => {
      return n.id === product.id
    })
    newCart[index].quantity --;
    setCart(newCart);
  }

  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <div>
      <NavBar setIsVisible={setIsVisible} />
      <CartDrawer 
      isVisible={isVisible} 
      setIsVisible={setIsVisible} 
      cart={cart} 
      increaseProductQuantity={increaseProductQuantity}
      decreaseProductQuantity={decreaseProductQuantity}
      removeProduct={removeProduct}
      />
      <div style={{ marginTop: 50 }}>
        <MainRoutes addToCart={addToCart} cart={cart}  increaseProductQuantity={increaseProductQuantity}
      decreaseProductQuantity={decreaseProductQuantity}
      removeProduct={removeProduct}/>
      </div>
      <Footer />
      <ChatButton />
    </div>
  );
}
