import React from "react";
//Components
import { Table, Button, Popover, message, Popconfirm } from "antd";
import { WhatsAppOutlined, DeleteOutlined } from "@ant-design/icons";
import firebase from "../../utils/Firebase";

import "./ComplaintsTable.scss";

const db = firebase.firestore(firebase);

export default function ComplaintsTable(props) {
  const { complaints, isLoading, setRefresh, refresh } = props;

  //Renders date based on the Time Stamp
  const renderDate = (timeStamp) => {
    var a = new Date(timeStamp.seconds * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  //Set complaint status to Finished
  const finalizeComplaint = (complaint) => {
    complaint.status = "finished";
    db.collection("complaints")
      .doc(complaint.uid)
      .update(complaint)
      .then(() => {
        message.success("Estado cambiado correctamente");
        setRefresh(!refresh);
      })
      .catch(() => message.error("Error al cambiar estado"));
  };

  //Set complaint status to in progress
  const processComplaint = (complaint) => {
    complaint.status = "onprocess";
    db.collection("complaints")
      .doc(complaint.uid)
      .update(complaint)
      .then(() => {
        message.success("Estado cambiado correctamente");
        setRefresh(!refresh);
      })
      .catch(() => message.error("Error al cambiar estado"));
  };

  //Delete Complaint
  const deleteComplaint = (id) => {
    db.collection("complaints")
      .doc(id)
      .delete()
      .then(() => {
        message.info("Denuncia eliminada correctamente");
        setRefresh(!refresh);
      })
      .catch(() => {
        message.error("Error al eliminar denuncia");
      });
  };

  //Renders status name based on the complaint status
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

  return (
    <div className="complaint-table">
      <Table dataSource={complaints} loading={isLoading}>
        <Table.Column title="Apellido" key="lastname" dataIndex="lastname" />
        <Table.Column title="Nombre" key="name" dataIndex="name" />
        <Table.Column title="DNI" key="id" dataIndex="id" />
        <Table.Column
          title="Fecha"
          key="date"
          dataIndex="date"
          render={(record) => <p>{renderDate(record)}</p>}
        />
        <Table.Column
          title="Estado"
          key="status"
          dataIndex="status"
          render={(record) => renderStatus(record)}
        />
        <Table.Column
          title="Acciones"
          key="action"
          render={(record) => (
            <>
              <Button
                shape="circle"
                icon={
                  <a
                    href={`https://wa.me/${record.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppOutlined style={{ color: "green" }} />
                  </a>
                }
              ></Button>
              <Popover
                title={"Cambiar Estado"}
                content={() => (
                  <>
                    <Button
                      shape="round"
                      type="primary"
                      disabled={record.status === "onprocess"}
                      onClick={() => processComplaint(record)}
                    >
                      En Proceso
                    </Button>
                    <Button
                      disabled={record.status === "finished"}
                      shape="round"
                      style={{ marginLeft: 5 }}
                      onClick={() => finalizeComplaint(record)}
                    >
                      Finalizado
                    </Button>
                  </>
                )}
              >
                <Button shape="round" type="secondary">
                  Cambiar Estado
                </Button>
              </Popover>
              <Popconfirm
                title="Seguro que desea eliminar?"
                onConfirm={() => deleteComplaint(record.uid)}
                okText="Si"
                cancelText="No"
              >
                <Button
                  style={{ borderColor: "red" }}
                  shape="circle"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                ></Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
    </div>
  );
}
