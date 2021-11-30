import React, { useState, useEffect } from "react";
import {
    Typography,
    Select,
    Form,
    Radio,
    Table,
    Divider,
    Checkbox,
    DatePicker,
    Row,
    Skeleton,
    Col,
    InputNumber,
    Input,
    Upload,
    message,
    Button,
    AutoComplete,
    Modal,
    Progress,
    Tag
} from "antd";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { useGetRequest } from "../../hooks";

export default function Donadores() {

    const [idCampana, setIdCampana] = useState(1);
    const { data: donadores } = useGetRequest(`/donadores/getDonadores?idCampana=${idCampana}`, [idCampana]);

    console.log(donadores);

    const columns = [
        {
            title: "Donante",
            dataIndex: "si_dono",
            key: "donante",
            render: (record) => (
                <Tag color={record === 1 ? 'green' : 'red'}>{record === 1 ? 'Sí' : 'No'}</Tag>
            )
        },
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
            title: "Acción",
            dataIndex: "",
            key: "accion",
            render: (record) => (
                <CheckCircleOutlined />
            )
        },
        
    ];

    return (
        <>
            <Divider>
                <h3>Reporte de donadores y pre-donadores</h3>
            </Divider>

            <Table
                style={{ overflow: "auto", cursor: "pointer" }}
                columns={columns}
                dataSource={donadores}
                rowKey="id"
            />
        </>
    )

}