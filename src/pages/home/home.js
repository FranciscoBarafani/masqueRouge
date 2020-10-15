import React, { useState, useEffect } from "react";
//Components
import Carousel from "../../components/Carousel";
import AddsSlider from "../../components/AddsSlider";
import { each } from "async";
import Adds from "../../components/Adds";
import firebase from "../../utils/Firebase";
import { Input, Row, Col, Pagination } from "antd";
import { FireSQL } from "firesql";
import "./home.scss";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebase);

export default function Home(props) {
  const { addToCart } = props;

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Search } = Input;

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (!loading || products) {
      setTotalItems(products.length);
      //Assigning starting page as 1 and initial page size as 10
      setCurrentList(products.slice(0, 10));
    }
  }, [products, loading]);

  //This function is called everytime the page is changed,
  //Slicing the result array in an smaller portion
  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentList(products.slice((page - 1) * pageSize, page * pageSize));
  };

  //This function gets the products from firebase
  const getProducts = () => {
    db.collection("products")
      .where("random", ">=", 0)

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
        {!loading && currentList ? (
          <>
            <Carousel products={currentList} addToCart={addToCart}/>
            <Pagination
              total={totalItems}
              current={currentPage}
              showSizeChanger
              pageSizeOptions={[10, 25, 50, 100]}
              onChange={onChangePage}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} de ${total} productos`
              }
            />
          </>
        ) : (
          <></>
        )}

        <Adds />
      </div>
    </div>
  );
}
