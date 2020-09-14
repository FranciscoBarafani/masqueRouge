//Firebase
import firebase from "./Firebase";
import "firebase/firestore";
//Firebase Storage
import "firebase/storage";
//Components
import { message } from "antd";

const db = firebase.firestore(firebase);

export function uploadObject(object, image, collection, setLoading) {
  //Image Upload
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(collection);
  imageRef
    .child(`${object.picture}`)
    .put(image)
    .then(() => {
      //After the image is uploaded we proceed to create the object with a reference to the picture
      db.collection(collection)
        .add(object)
        .then(() => {
          message.success("Creado correctamente.");
          setLoading(false);
        })
        .catch(() => message.error("Error al crear."));
    })
    .catch(() => message.error("Error al subir imagen."));
}
