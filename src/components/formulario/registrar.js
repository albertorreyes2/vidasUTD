import React, { useState, useEffect } from "react";
import {
    Typography,
    Select,
    Form,
    Radio,
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
} from "antd";
import { UploadOutlined, SaveOutlined, LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

export default function Registrar() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const dateFormat = "DD/MM/YYYY";
    const [form, setForm] = useState({});
    const [formulario] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const initialState = "";
    const [result, setResult] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const validations = (e) => {
        let {

        } = form;
    }

    const handleSearch = (value) => {
        let res = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['utd.edu.mx', 'gmail.com', 'hotmail.com']
                .map((domain) => `${value}@${domain}`);
        }
        setResult(res);
    };
    return (
        <>
            <Divider>
                <h3>Registar donador</h3>
            </Divider>
            <Form
                {...layout}
                form={formulario}
                initialValues={{
                    currency: "MXN",
                    rec: null,
                    adj: null,
                    contractNumberCheck: false,
                    FFCheck: false,
                }}
                layout="vertical"
            >
                <Row justify="center" gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: 'Por favor ingresa el nombre ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Apellido paterno"
                            name="apellido_p"
                            rules={[{ required: true, message: 'Por favor ingresa el apellido ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Apellido materno"
                            name="apellido_m"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center" gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item
                            label="Fecha de nacimiento"
                            name="fecha_nacimiento"
                            rules={[{ required: true, message: 'Por favor ingresa la fecha de nacimiento' }]}
                        >
                            <DatePicker style={{ width: "100%", marginRight: "1rem" }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="correo"
                            label="Correo electrónico"
                            rules={[{ required: true, message: 'Por favor ingresa el correo electrónico ' },
                            {pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Ingrese email válido " }]}
                        >
                            <AutoComplete
                                // onChange={(e) => handleChange(e, "correo")}
                                onSearch={handleSearch}
                                placeholder="correo@dominio.com"
                            >
                                {result.map((email) =>
                                    <AutoComplete.Option key={email} value={email}>
                                        {email}
                                    </AutoComplete.Option>
                                )}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Número de teléfono"
                            name="cel"
                            rules={[{ required: true, message: 'Por favor ingresa el número de teléfono' }]}
                        >
                            <InputNumber style={{ width: "100%", marginRight: "1rem" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} justify="center">
                    <Col span={4}>
                        <Button
                            icon={<SaveOutlined />}
                            onClick={() => {
                                validations('positivo')
                                if (!validations()) {
                                    message.error(
                                        "Verifica que todos los campos hayan sido ingresados correctamente."
                                    );
                                    setLoading(false);
                                    return;
                                }
                            }}
                            loading={loading}
                        >
                            Registrar donador
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>
    );
}