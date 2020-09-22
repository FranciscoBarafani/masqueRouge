import React, { useState, useEffect } from "react";
//Components
import { Row, Col } from "antd";
import { each } from "async";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/storage";

import "./Adds.scss";

const db = firebase.firestore(firebase);

export default function Adds() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("adds");

  useEffect(() => {
    getAdds();
  }, []);

  const getImages = (docs, dataSet) => {
    each(
      docs.docs,
      (slide, callback) => {
        const data = slide.data();
        data.id = slide.id;
        imageRef
          .child(`${data.picture}`)
          .getDownloadURL()
          .then((url) => {
            data.url = url;
            dataSet.push(data);
            callback();
          });
      },
      () => {
        setImages(dataSet);
        setIsLoading(false);
      }
    );
  };

  //Get Adds
  //This function gets the slides and their images urls
  const getAdds = () => {
    const random = Math.random();
    var dataSet = [];
    db.collection("adds")
      .where("random", ">=", 0)
      .orderBy("random")
      .limit(4)
      .get()
      .then((response) => {
        var docs = response;
        if (response.docs.length === 0) {
          db.collection("slides")
            .where("random", "<=", random)
            .orderBy("random")
            .limit(3)
            .get()
            .then((response) => {
              docs = response;
              getImages(docs, dataSet);
            });
        } else {
          getImages(docs, dataSet);
        }
      });
  };

  return (
    <div className="adds">
      {!isLoading && images ? (
        <>
          <Row gutter={[10, 10]}>
            <Col span={6}>
              <img
                src={images[0].url}
                alt="Propaganda 1"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={images[1].url}
                alt="Propaganda 2"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={images[2].url}
                alt="Propaganda 3"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col span={6}>
              <img
                src={images[3].url}
                alt="Propaganda 4"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
