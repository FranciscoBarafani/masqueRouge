import React, { useEffect, useState } from "react";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import { each } from "async";
//Components
import { Carousel } from "antd";

import "./AddsSlider.scss";

const db = firebase.firestore(firebase);

export default function AddSlider() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState(null);

  useEffect(() => {
    getSlides();
  }, []);

  //This function gets the slides and their images urls
  const getSlides = () => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("slides");

    const random = Math.random();
    var dataSet = [];
    db.collection("slides")
      .where("random", ">=", 0)
      .orderBy("random")
      .limit(3)
      .get()
      .then((response) => {
        each(
          response.docs,
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
      });
  };

  return (
    <div className="add-slider">
      {!isLoading && images ? (
        <div>
          <Carousel autoplay>
            <div>
              <img src={images[0].url} alt="Propaganda 1" />
            </div>
            <div>
              <img src={images[1].url} alt="Propaganda 2" />
            </div>
            <div>
              <img src={images[2].url} alt="Propaganda 3" />
            </div>
          </Carousel>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
