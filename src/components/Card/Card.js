import React, { useState, useEffect } from "react";
//Components
import { Card as MyCard } from "antd";
import { Link } from "react-router-dom";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./Card.scss";

export default function Card(props) {
  const { title, description, picture } = props;
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

  return (
    <div className="card">
      <Link to="/home/checkout">
        <MyCard
          hoverable
          style={{ width: 240, height: 260 }}
          cover={
            <img
              alt={description}
              src={image}
              style={{ maxWidth: 240, maxHeight: 180 }}
            />
          }
        >
          <MyCard.Meta title={`$${title}`} description={description} />
        </MyCard>
      </Link>
    </div>
  );
}
