import React, { useState, useEffect } from "react";
//Components
import Carousel from "../../components/Carousel";
import AddsSlider from "../../components/AddsSlider";
import { each } from "async";
import Adds from "../../components/Adds";
import firebase from "../../utils/Firebase";
import { Input, Row, Col } from "antd";
import { FireSQL } from "firesql";
import "./home.scss";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebase);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Search } = Input;

  useEffect(() => {
    getProducts();
  }, []);

  //This function gets the products from firebase
  const getProducts = () => {
    db.collection("products")
      .where("random", ">=", 0)
      .limit(15)
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
          }
        );
      })
      .catch(() => console.log("Error al obtener productos."));
  };

  //This function searches products
  const searchProdcuts = async (word) => {
    const products = fireSQL.query(`
    SELECT * 
    FROM products
    WHERE name LIKE '${word}%'
  `);
    await products
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="home">
      <AddsSlider />
      <Row align="middle" justify="center">
        <Col span={8}>
          <Search
            placeholder="Buscar..."
            enterButton
            onSearch={(word) => searchProdcuts(word)}
          />
        </Col>
      </Row>
      <div className="home-body">
        {!loading && products ? <Carousel products={products} /> : <></>}
        <Adds />
      </div>
    </div>
  );
}
