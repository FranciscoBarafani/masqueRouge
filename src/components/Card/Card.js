import React from "react";
//Components
import { Card as MyCard } from "antd";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { title } = props;
  return (
    <Link to="/checkout">
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
    </Link>
  );
}
