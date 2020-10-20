import React from 'react'
//Components
import { List, Avatar, Button } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"

export default function CartList(props) {
    const { cart, removeProduct, increaseProductQuantity, decreaseProductQuantity, refresh, setRefresh } = props;   

    return (  
    <List
    itemLayout="horizontal"
    dataSource={cart}
    locale={{ emptyText: <><ShoppingCartOutlined style={{fontSize: 25}}/><p>Su carrito está vacío</p></>}}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.picture} />}
          title={item.name}
          description={`$${item.price}`}
        />
        <Button 
        style={{marginLeft: 5, marginRight: 5}}
        disabled={item.quantity === 1}
        onClick={() => {
            decreaseProductQuantity(item);
            setRefresh(!refresh);
        }}>-</Button>
        {item.quantity}
        <Button
                style={{marginLeft: 5}}

        onClick={() => {increaseProductQuantity(item);
        setRefresh(!refresh)}}>+</Button>
       <DeleteOutlined  
        style={{fontSize: 15, color: "red", marginLeft: 5}}
       onClick={() => removeProduct(item.id)}/>
      </List.Item>
    )}
  />    
    )
}
