import React from "react";
//Components
import { List as MyList } from "antd";
import Card from "../Card";

export default function List(props) {
  const { data, addToCart } = props;
  return (
    <MyList
      grid={{
        gutter: 0,
        xs: 1,
        sm: 2,
        md: 5,
        lg: 5,
        xl: 5,
        xxl: 5,
      }}
      dataSource={data}
      renderItem={(item) => (
        <MyList.Item>
          <Card
            title={item.price}
            description={item.name}
            picture={item.picture}
            addToCart={addToCart}
            id={item.id}
          />
        </MyList.Item>
      )}
    />
  );
}
