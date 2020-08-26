import React from "react";
//Components
import { Button } from "antd";

import "./BuyButton.scss";

export default function BuyButton() {
  return (
    <div className="buy-button">
      <Button shape="round">Comprar</Button>
    </div>
  );
}
