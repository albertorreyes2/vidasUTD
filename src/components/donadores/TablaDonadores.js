import { Button, Table, Tag } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

import moment from "moment";


export default function TablaDonadores({ donadores }) {

    const columns = [
        {
            title: "Tipo de sangre",
            dataIndex: "tipo_sangre",
            key: "tipo_sangre",
        },
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
        {
            title: "Fecha nacimiento",
            dataIndex: "fecha_nacimiento",
            key: "fecha_nacimiento",
            render: (text) => moment.utc(text).format("DD/MM/YYYY"),
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Universidad",
            dataIndex: "universidad",
            key: "universidad",
        },
        {
            title: "Carrera",
            dataIndex: "carrera",
            key: "carrera",
        },
        {
            title: "Nombre del responsable",
            dataIndex: "resp_nombre",
            key: "resp_nombre",
        },
        {
            title: "Tel. del responsable",
            dataIndex: "resp_tel",
            key: "resp_tel",
        },
        {
            title: "Acción",
            dataIndex: "",
            key: "accion",
            render: (record) => (
                <Button type="primary" shape="round" size='middle' ghost> Generar constancia </Button>
            )
        },

    ];


    return (

        <Table
            style={{ overflow: "auto", cursor: "pointer" }}
            columns={columns}
            dataSource={donadores}
            pagination={{ hideOnSinglePage: true }}
            rowKey="id"
        />

    )

}