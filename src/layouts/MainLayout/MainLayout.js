import React from "react";
import MainRoutes from "../../routes/MainRoutes";
//Components
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ChatButton from "../../components/ChatButton";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <MainRoutes />
      <Footer />
      <ChatButton />
    </div>
  );
}
