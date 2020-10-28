import React from 'react'
//Components
import { Table, Button } from "antd";

export default function ComplaintsTable(props) {
    const { complaints, isLoading } = props;

    return (
        <Table dataSource={complaints} loading={isLoading}>
            <Table.Column title="Apellido" key="lastname" dataIndex="lastname"/>
            <Table.Column title="Nombre" key="name" dataIndex="name"/>
            <Table.Column title="DNI" key="id" dataIndex="id"/>
            <Table.Column title="Fecha" key="date" dataIndex="date"/>
            <Table.Column title="Estado" key="status" dataIndex="status"   />
            <Table.Column title="Acciones" key="action" render={() => 
                <>
                <Button>Llamar</Button>
                <Button>Cambiar Estado</Button>
                </>
            }/>
        </Table>
    )
}
