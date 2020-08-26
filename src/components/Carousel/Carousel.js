import React from "react";
//Components
import { Carousel as Car } from "antd";
import List from "../List";

import "./Carousel.scss";

export default function Carousel() {
  const data = [
    {
      title: "Titulo 1",
    },
    {
      title: "Titulo 2",
    },
    {
      title: "Titulo 3",
    },
    {
      title: "Titulo 4",
    },
    {
      title: "Titulo 5",
    },
  ];

  const data1 = [
    {
      title: "Titulo 6",
    },
    {
      title: "Titulo 7",
    },
    {
      title: "Titulo 8",
    },
    {
      title: "Titulo 9",
    },
    {
      title: "Titulo 10",
    },
  ];

  return (
    <div className="carousel">
      <Car autoplay>
        <div>
          <List data={data} />
        </div>
        <div>
          <List data={data1} />
        </div>
      </Car>
    </div>
  );
}
