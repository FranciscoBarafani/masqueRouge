import React, { useState } from "react";
import MainRoutes from "../../routes/MainRoutes";
//Components
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ChatButton from "../../components/ChatButton";
import CartDrawer from "../../components/CartDrawer";

export default function MainLayout() {
  const [isVisible, setIsVisible] = useState(false);

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
