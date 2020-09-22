import React, { useEffect, useState } from "react";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import { each } from "async";
import { map } from "lodash";
//Components
import { Carousel } from "antd";

import "./AddsSlider.scss";

const db = firebase.firestore(firebase);

export default function AddSlider() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState(null);
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child("slides");

  useEffect(() => {
    getSlides();
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

  //This function gets the slides and their images urls
  const getSlides = () => {
    const random = Math.random();
    var dataSet = [];
    db.collection("slides")
      .where("random", ">=", random)
      .orderBy("random")
      .limit(3)
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
            })
            .catch((error) => console.log(error));
        } else {
          getImages(docs, dataSet);
        }
      });
  };

  return (
    <div className="add-slider">
      {!isLoading && images ? (
        <div>
          <Carousel autoplay>
            {map(images, (image) => (
              <div>
                <img src={image.url} alt={`${image.url}`} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
