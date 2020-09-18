import React, { useState, useEffect } from "react";
//Components
import Carousel from "../../components/Carousel";
import AddsSlider from "../../components/AddsSlider";
import { each } from "async";
import Adds from "../../components/Adds";
import firebase from "../../utils/Firebase";

import "./home.scss";

const db = firebase.firestore(firebase);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  //This function gets the products from firebase
  const getProducts = () => {
    const random = Math.random();
    db.collection("products")
      .where("random", ">=", 0)
      .limit(10)
      .get()
      .then((response) => {
        const products = [];
        each(
          response.docs,
          (doc, callback) => {
            const data = doc.data();
            data.id = doc.id;
            products.push(data);
            callback();
          },
          () => {
            setProducts(products);
            setLoading(false);
            console.log(products);
          }
        );
      })
      .catch(() => console.log("Error al obtener productos."));
  };

  return (
    <div className="home">
      <AddsSlider />
      <div className="home-body">
        {!loading && products ? <Carousel products={products} /> : <></>}
        <Adds />
      </div>
    </div>
  );
}
