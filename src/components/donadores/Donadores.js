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
import { useStateValue } from "../../providers/StateProvider";

const { Title } = Typography;
const { Option } = Select;
export default function Donadores() {

    const [idCampana, setIdCampana] = useState(1);
    const [campSelected, setCampSelected] = useState(false);
    const [{triggerReloadDonadores}, dispatch] = useStateValue();

    const { data: campanas } = useGetRequest(`/campaign/getCamps`, []);
    const { data: donadores } = useGetRequest(`/donadores/getDonadores?idCampana=${idCampana}`, [idCampana, triggerReloadDonadores]);

    console.log('campanas', campanas);

    return (
        <>
            <div style={{ width: '100%', margin: '0 auto' }}>
                <Title level={2}>¿Qué campaña deseas consultar?</Title>
                <Select style={{ width: 450 }} defaultValue={campanas[0]?.id || 1} placeholder='Selecciona una opción' onChange={(camp) => {
                    console.log('camp', camp);
                    setIdCampana(camp);
                    setCampSelected(true);
                }}>
                    {campanas.map(campana => (
                        <Option key={campana.id} value={campana.id}>{campana.nombre}</Option>
                    ))}
                </Select>
            </div>
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
                        <TablaDonadores donadores={donadores.filter(donador => donador.si_dono === 1)} tipo='donante' />
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </>
           
    )

}