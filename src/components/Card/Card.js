import React from "react";
//Components
import { Card as MyCard, Button } from "antd";

export default function Card(props) {
  const { title } = props;
  return (
    <MyCard
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <MyCard.Meta title={"$650"} description="Desripcion del Producto" />
    </MyCard>
  );
}
