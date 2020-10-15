import React, { useState, useEffect } from "react";
//Components
import { Card as MyCard, Button } from "antd";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/storage";

export default function Card(props) {
  const { title, description, picture, id,  addToCart } = props;
  const [image, setImage] = useState(null);

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("products");

  useEffect(() => {
    getImage();
  }, [props]);

  //This function gets the product image
  const getImage = () => {
    imageRef
      .child(`${picture}`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      });
  };

  //Create Product to add to Cart
  const addProduct = () => {
    const product = {
      id: id,
      name: description,
      price: title,
      picture: image,
      quantity: 1,
    }
    addToCart(product, id);
  }

  return (
    <div className="card">
        <MyCard
          hoverable
          style={{ width: 240, height: 320 }}
          actions={[
            <Button onClick={() => addProduct()}>Agregar al Carrito</Button>
          ]}
          cover={
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img
              alt={description}
              src={image}
              style={{ maxWidth: 220, height: 160 }}
            />
            </div>
          }
        >
          <MyCard.Meta title={`$${title}`} description={description} />
        </MyCard>
    </div>
  );
}
