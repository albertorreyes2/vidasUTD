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
import { useGetRequest } from "../../hooks";

const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

export default function Registrar() {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const dateFormat = "DD/MM/YYYY";
    const [form, setForm] = useState({anio_campana: moment().year()});
    const [formulario] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const initialState = "";
    const [result, setResult] = useState([]);
    const {data: carreras} = useGetRequest('/carreras/getCarreras');
    const {data: uni} = useGetRequest('/universidades/getUniversidades');
    const [phoneVal, setPhoneVal] = useState({resp_tel: '', cel: ''})
    const handleUni = () => {
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    console.log('form', form)
    // const validations = (e) => {
    //     let {
    //         nombre, apellido_p, apellido_m, correo, fecha_nacimiento, cel, estudiante, matricula, resp_nombre, resp_tel, tipo_sangre
    //     } = form;
    // }

    const handlePhoneNumber = (phone, type) => {
        setPhoneVal({...phoneVal, [type]: 'validating'})
        const regex = /^\d{10}$/;
        if(regex.test(phone)) {
            setPhoneVal({[type]: 'success'})
            setForm({...form, [type]: phone})
        } else {
            setPhoneVal({[type]: 'error'})
        }

    }

    const handleSearch = (value) => {
        let res = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['utd.edu.mx', 'gmail.com', 'hotmail.com', 'outlook.com']
                .map((domain) => `${value}@${domain}`);
        }
        setResult(res);
    };

    const newPredonante = () => {
        setLoading(true)
        axios.post("/donador/newDonador", form)
            .then(function (response) {
                if (response.data.ok) {
                    setForm({anio_campana: moment().year()});
                    setPhoneVal({cel: '', resp_tel: ''})
                    Swal.fire('Nuevo predonante')
                    formulario.resetFields();
                    setLoading(false)

                } else {
                    Swal.fire('No hay predonante')
                    setLoading(false)
                }
            }
            )
        setLoading(false)
    }
    console.log(form)
    return (
        <>
            <Divider>
                <Typography.Title level={3}>Hoja de registro</Typography.Title>
            </Divider>
            <Form
                {...layout}
                form={formulario}
                initialValues={{

                }}
                layout="vertical"
            >
                <Row justify="left" gutter={[8, 8]}>
                    <Divider orientation="left">
                        <h3>Datos del pre-donador</h3>
                    </Divider>
                </Row>
                <Row justify="center" gutter={[8, 8]}>

                    <Col span={6}>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: 'Por favor ingresa el nombre ' }]}
                        >
                            <Input onChange={(e) => {
                                setForm({ ...form, nombre: e.target.value })
                            }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Apellido paterno"
                            name="apellido_p"
                            rules={[{ required: true, message: 'Por favor ingresa el apellido ' }]}
                        >
                            <Input onChange={(e) => {
                                setForm({ ...form, apellido_p: e.target.value })
                            }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Apellido materno"
                            name="apellido_m"
                        >
                            <Input onChange={(e) => {
                                setForm({ ...form, apellido_m: e.target.value })
                            }} />
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
                            <DatePicker style={{ width: "100%", marginRight: "1rem" }}
                                onChange={(date, fn) => {
                                    setForm({ ...form, fecha_nacimiento: fn });
                                }}

                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="correo"
                            label="Correo electrónico"
                            rules={[{ required: true, message: 'Por favor ingresa el correo electrónico ' },
                            { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Ingrese email válido " }]}
                        >
                            <AutoComplete
                                onChange={(e) => { setForm({ ...form, correo: e }) }}
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
                            hasFeedback validateStatus={phoneVal.cel}
                        >
                            <Input style={{ width: "100%", marginRight: "1rem" }} 
                                onChange={(e) => handlePhoneNumber(e.target.value, 'cel' )} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="left" gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name="estudiante" valuePropName="checked"
                            onChange={(e) => {
                                setForm({ ...form, estudiante: e.target.checked === true ? 1 : 0 });
                            }
                            }
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Estudiante</Checkbox>
                        </Form.Item>
                    </Col>


                    <Col span={8}>
                        <Form.Item name="tipo_sangre" label="Tipo de sangre" rules={[{ required: true, message: 'Selecciona un campo' }]}>
                            <Select onChange={selectedOption => setForm({...form, tipo_sangre: selectedOption})}>
                                <Select.Option value="O+">O+</Select.Option>
                                <Select.Option value="A+">A+</Select.Option>
                                <Select.Option value="B+">B+</Select.Option>
                                <Select.Option value="AB+">AB+</Select.Option>
                                <Select.Option value="A-">A-</Select.Option>
                                <Select.Option value="B-">B-</Select.Option>
                                <Select.Option value="AB-">AB-</Select.Option>
                                <Select.Option value="O-">O-</Select.Option>
                                <Select.Option value="Desconocida">Desconocida</Select.Option>
                            </Select>      
                        </Form.Item>
                    </Col>
                </Row>
                {form.estudiante === 1 &&
                    <Row justify="center" gutter={[8, 8]}>
                        <Col span={6}>
                            <Form.Item name="universidad" label="Universidad" rules={[{ required: true, message: 'Selecciona un campo' }]}>
                                <Select
                                    placeholder="Selecciona una universidad"
                                    onChange={(uni) => {
                                        setForm({ ...form, id_universidad: uni });
                                    }}
                                >
                                    {uni.map(uni =>  <Option value={uni.id}>{uni.nombre}</Option>)}
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span={5}>
                            <Form.Item name="carrera" label="Carrera" rules={[{ required: true, message: 'Selecciona un campo' }]}>

                                <Select
                                    placeholder="Selecciona una carrera"
                                    onChange={(carrera) => {
                                        setForm({ ...form, id_carrera: carrera });
                                    }}>
                                    {carreras.map(x => <Option value={x.id}>{x.nombre}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="Matrícula"
                                name="matricula"
                                rules={[{ required: true, message: 'Por favor ingresa la matrícula' }]}
                            >
                                <Input onChange={(e) => {
                                    setForm({ ...form, matricula: e.target.value })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                }
                <Row justify="left" gutter={[8, 8]}>
                    <Divider orientation="left">
                        <h3>Contacto en caso de emergencia</h3>
                    </Divider>
                </Row>
                <Row justify="center" gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item name="resp_nombre" label="Nombre del responsable" rules={[{ required: true, message: 'Selecciona un campo' }]}>
                            <Input onChange={(e) => setForm({ ...form, resp_nombre: e.target.value })} />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <Form.Item name="resp_tel" label="Teléfono de contacto" hasFeedback validateStatus={phoneVal.resp_tel} rules={[{ required: true, message: 'Selecciona un campo' }]}>
                            <Input style={{ width: "100%", marginRight: "1rem" }} onChange={(e) => handlePhoneNumber(e.target.value, 'resp_tel' )} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} justify="end">
                    <Col span={8}>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={() => {
                                newPredonante()
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