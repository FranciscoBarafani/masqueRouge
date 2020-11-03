import React, { useState, useEffect } from "react";
//Components
import GoogleMapReact from "google-map-react";
import { Avatar, Popover, message, Button } from "antd";
import { UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import Loading from "../Loading";
//Firebase
import firebase from "../../utils/Firebase";

import "./ComplaintsMap.scss";

const db = firebase.firestore(firebase);

export default function ComplaintsMap() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <p>Pendiente</p>;
      case "onprocess":
        return <p>En Proceso</p>;
      case "finished":
        return <p>Finalizado</p>;
      default:
        return <p>Error</p>;
    }
  };

  const renderPopOverColor = (status) => {
    console.log(status);
    switch (status) {
      case "pending":
        return { backgroundColor: "red" };
      case "onprocess":
        return { backgroundColor: "blue" };
      case "finished":
        return { backgroundColor: "green" };
      default:
        return <p>Error</p>;
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = () => {
    setIsLoading(true);
    var complaints = [];
    db.collection("complaints")
      .get()
      .then((response) => {
        response.docs.forEach((document) => {
          complaints.push(document.data());
        });
        setComplaints(complaints);
      })
      .catch(() =>
        message.error("Error al cargar denuncias, intentelo nuevamente")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="complaints-map">
      {!isLoading && complaints ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBN3hl8CILMQex6Sv2xo0rxrhetOd1Zcs8" }}
          defaultCenter={{ lat: -31.422964, lng: -64.1752018 }}
          defaultZoom={10}
        >
          {complaints.map((complaint) => (
            <Popover
              lat={complaint.location.latitude}
              lng={complaint.location.longitude}
              title={() => (
                <>
                  {complaint.name} {complaint.lastname}
                  <Button
                    shape="circle"
                    style={{ marginLeft: 5 }}
                    icon={
                      <a
                        href={`https://wa.me/${complaint.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppOutlined style={{ color: "green" }} />
                      </a>
                    }
                  ></Button>
                </>
              )}
              content={() => (
                <>
                  {renderStatus(complaint.status)}
                  {complaint.street}
                </>
              )}
            >
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={renderPopOverColor(complaint.status)}
              />
            </Popover>
          ))}
        </GoogleMapReact>
      ) : (
        <Loading />
      )}
    </div>
  );
}
