import React from "react";
//Components
import { Carousel as Car } from "antd";
import List from "../List";

import "./Carousel.scss";

export default function Carousel(props) {
  const { products, addToCart } = props;

  return (
    <div className="carousel">
      <Car autoplay>
        <div>
          <List data={products} addToCart={addToCart}/>
        </div>
      </Car>
    </div>
  );
}
