import React, { useState, useEffect } from "react";
import MainRoutes from "../../routes/MainRoutes";
//Components
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ChatButton from "../../components/ChatButton";
import CartDrawer from "../../components/CartDrawer";
//Firebase
import firebase from "../../utils/Firebase";

export default function MainLayout() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    firebase.auth().signInAnonymously();
  }, []);

  return (
    <div>
      <NavBar setIsVisible={setIsVisible} />
      <CartDrawer isVisible={isVisible} setIsVisible={setIsVisible} />
      <div style={{ marginTop: 50 }}>
        <MainRoutes />
      </div>
      <Footer />
      <ChatButton />
    </div>
  );
}
