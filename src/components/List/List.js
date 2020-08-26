import React from "react";
//Components
import { List as MyList } from "antd";
import Card from "../Card";

export default function List(props) {
  const { data } = props;
  return (
    <MyList
      grid={{
        gutter: 0,
        xs: 1,
        sm: 2,
        md: 5,
        lg: 5,
        xl: 5,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <MyList.Item>
          <Card title={item.title} />
        </MyList.Item>
      )}
    />
  );
}
