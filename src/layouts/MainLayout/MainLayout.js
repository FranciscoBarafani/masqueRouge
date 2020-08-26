import React from "react";
import MainRoutes from "../../routes/MainRoutes";
//Components
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Row } from "antd";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <MainRoutes />
      <Footer />
    </div>
  );
}
