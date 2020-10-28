import React, { useState, useEffect} from 'react'
//Components
import GoogleMapReact from "google-map-react";
import { Avatar, Popover, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Loading from "../Loading";
//Firebase
import firebase from "../../utils/Firebase";

import "./ComplaintsMap.scss";

const db = firebase.firestore(firebase);

export default function ComplaintsMap() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       getComplaints();
    }, [])

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
            console.log(complaints);
        })
        .catch(() => message.error("Error al cargar denuncias, intentelo nuevamente"))
        .finally(() => setIsLoading(false))
    }

    return (
        <div className="complaints-map">
            {!isLoading && complaints ?  <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyBN3hl8CILMQex6Sv2xo0rxrhetOd1Zcs8" }}
                  defaultCenter={{lat: -31.422964, lng: -64.1752018}}
                  defaultZoom={10}
            >
                {complaints.map(complaint => 
                     <Popover lat={complaint.location.latitude} 
                     lng={complaint.location.longitude} 
                     title={`${complaint.name} ${complaint.lastname}`}
                     content={() => <p>{complaint.status}</p>}
                 >
                   <Avatar size="small" icon={<UserOutlined />} />
                   </Popover>
                )}
            </GoogleMapReact> : <Loading />}
        </div>
    )
}
