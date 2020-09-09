import React from "react";
//Components
import { Carousel } from "antd";
//Images
import img1 from "../../assets/slideradd1.webp";
import img2 from "../../assets/slideradd2.webp";
import img3 from "../../assets/slideradd3.webp";

import "./AddsSlider.scss";

export default function AddSlider() {
  return (
    <div className="add-slider">
      <Carousel autoplay>
        <div>
          <img src={img1} alt="Propaganda 1" />
        </div>
        <div>
          <img src={img2} alt="Propaganda 2" />
        </div>
        <div>
          <img src={img3} alt="Propaganda 3" />
        </div>
      </Carousel>
    </div>
  );
}
