import React, {useEffect, useState } from 'react'
//Components 
import ComplaintsTable from "../../components/ComplaintsTable";
import { message } from "antd";
//Firebase
import firebase from "../../utils/Firebase";

const db = firebase.firestore(firebase);

export default function Complaints() {
    const [complaints, setComplaints] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      getComplaints();
    }, [])


    //Get Complaints function
    const getComplaints = () => {
        setIsLoading(true);
        var complaints = [];
        db.collection("complaints")
        .get()
        .then((response) => {
            response.docs.forEach(document => {
                complaints.push(document.data())
            })
            setComplaints(complaints);
        })
        .catch(() => message.error("Error al cargar denuncias, intentelo nuevamente"))
        .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <h2>Tabla de Denuncias</h2>
           <ComplaintsTable complaints={complaints} isLoading={isLoading}/>
        </div>
    )
}
