import React from "react";
//Components
import { Row, Col } from "antd";
import Carousel from "../../components/Carousel";
import AddsSlider from "../../components/AddsSlider";
import firebase from "../../utils/Firebase";
//Images
import img1 from "../../assets/add1.jpeg";
import img2 from "../../assets/add2.jpeg";
import img3 from "../../assets/add3.jpeg";
import img4 from "../../assets/add4.jpeg";
import img5 from "../../assets/add5.jpeg";
import img6 from "../../assets/add6.jpeg";

import "./home.scss";

export default function home() {
  return (
    <div className="home">
      <AddsSlider />
      <div className="home-body">
        <Carousel />
        <Carousel />
        <div className="home-adds">
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <img
                src={img1}
                alt="Propaganda 1"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={img2}
                alt="Propaganda 2"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={12}>
              <img
                src={img3}
                alt="Propaganda 3"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <img
                src={img4}
                alt="Propaganda 4"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={img5}
                alt="Propaganda 5"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={img6}
                alt="Propaganda 6"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
