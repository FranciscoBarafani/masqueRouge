//Essentials
import React from "react";
//Components
import { Spin } from "antd";

import "./Loading.scss";

//This component renders a Loading Spinner
export default function Loading() {
  return (
    <div className="loading">
      <Spin />
      <h1>Cargando</h1>
    </div>
  );
}
