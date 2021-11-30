import React, { useState, useEffect } from "react";
import {
    Table, Divider, Tabs, Select, Button
} from "antd";
import axios from "axios";
import { generarConstancia } from "./generarConstancia";


export default function Registros() {
    const [preDon, setPreDon] = useState([])
    const [donantes, setDonantes] = useState([])
    const [camps, setCamps] = useState([])
    const [form, setForm] = useState([])
    const [nombre, setNombre] = useState("")
    useEffect(() => {
        axios.get(`/campaign/getCamps`).then(res => { setCamps(res.data.result) });
    }, [])
    const columns = [

        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Carrera',
            dataIndex: 'carrera',
            key: 'carrera',
        },

        {
            title: 'Acción',
            dataIndex: 'id',
            key: 'id',
            render: (e, record) => (
                <>
                    <Button type="primary" onClick={() => updPredonante(setNombre(record.nombre))}>Generar constancia</Button>
                </>
            ),
        },
    ];

    const updPredonante = () => {
        generarConstancia(nombre.toString())
    }
    const generatePreDon = (e) => {
        axios.get(`/donadores/getDonadores?idCampana=${e}&si_dono=${0}`).then(res => { setPreDon(res.data.result) });
    }

    const generateDonantes = (e) => {
        axios.get(`/donadores/getDonadores?idCampana=${e}&si_dono=${1}`).then(res => { setPreDon(res.data.result) });
    }
    return (

        <>
            <Divider>
                <h3>Registros</h3>
            </Divider>
            <div className="card-container">
                <Tabs type="card">
                    <Tabs.TabPane tab="Pre Donantes" key="1">
                        <Select
                            style={{ float: 'right', marginBottom: '10px' }}
                            placeholder="Selecciona un opcíon"
                            onChange={(e) => {
                                generatePreDon(e)
                            }}>
                            {camps.map(x => {
                                return <Select.Option value={x.id}>{x.nombre}</Select.Option>
                            })}
                        </Select>
                        <Table columns={columns} dataSource={preDon} />,
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Donantes" key="2">
                        <Select
                            style={{ float: 'right', marginBottom: '10px' }}
                            placeholder="Selecciona un opcíon"
                            onChange={(e) => {
                                generateDonantes(e)
                            }}>
                            {camps.map(x => {
                                return <Select.Option value={x.id}>{x.nombre}</Select.Option>
                            })}
                        </Select>
                        <Table columns={columns} dataSource={donantes} />,                   
                     </Tabs.TabPane>
                </Tabs>
            </div>,
        </>
    );
}