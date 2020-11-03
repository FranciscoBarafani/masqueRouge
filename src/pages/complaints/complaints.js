import React, { useEffect, useState } from "react";
//Components
import ComplaintsTable from "../../components/ComplaintsTable";
import { message } from "antd";
//Firebase
import firebase from "../../utils/Firebase";

import "./complaints.scss";

const db = firebase.firestore(firebase);

export default function Complaints() {
  const [complaints, setComplaints] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  //This useEffect is used to force render after a transaction is finished
  useEffect(() => {
    getComplaints();
  }, [refresh]);

  //Get Complaints function
  const getComplaints = () => {
    setIsLoading(true);
    var complaints = [];
    db.collection("complaints")
      .get()
      .then((response) => {
        response.docs.forEach((document) => {
          const data = document.data();
          data.uid = document.id;
          complaints.push(data);
        });
        setComplaints(complaints);
      })
      .catch(() =>
        message.error("Error al cargar denuncias, intentelo nuevamente")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="complaints">
      <h2>Tabla de Denuncias</h2>
      <ComplaintsTable
        complaints={complaints}
        isLoading={isLoading}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
}
