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
    Tabs,
    Tag,
    Space
} from "antd";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { useGetRequest } from "../../hooks";
import TablaDonadores from "./TablaDonadores";


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
                <h3>Reporte de donantes y pre-donantes</h3>
            </Divider>
            <Tabs type="card">
                <Tabs.TabPane tab="Pre-donantes" key="1">
                    <div style={{ marginTop: '30px' }}>
                        <TablaDonadores donadores={donadores.filter(donador => donador.si_dono === 0)} tipo='predonante' />
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Donantes" key="2">
                    <div style={{ marginTop: '30px' }}>
                        <TablaDonadores donadores={donadores.filter(donador => donador.si_dono === 1)} tipo='donante'/>
                    </div>
                </Tabs.TabPane>
            </Tabs>


        </>
    )

}