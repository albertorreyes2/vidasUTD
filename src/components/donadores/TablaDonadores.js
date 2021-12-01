import { Button, Input, Space, Table, Tag } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";


import { generarConstancia } from "../registros/generarConstancia";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStateValue } from '../../providers/StateProvider';

export default function TablaDonadores({ donadores, tipo }) {
    const [{}, dispatch] = useStateValue();

    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Buscar...`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Buscar
              </Button>
              <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
                Limpiar
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select(), 100);
          }
        },
        render: text =>
          search?.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[search?.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
        setSearch({ searchText: '', searchedColumn: '' });
      };


    const [columns, setColumns] = useState([
        {
            title: "Tipo de sangre",
            dataIndex: "tipo_sangre",
            key: "tipo_sangre",
        },
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            ...getColumnSearchProps('nombre')
        },
        {
            title: "Fecha nacimiento",
            dataIndex: "fecha_nacimiento",
            key: "fecha_nacimiento",
            render: (text) => moment.utc(text).format("DD/MM/YYYY"),
        },
        {
            title: "Teléfono",
            dataIndex: "cel",
            key: "cel",
            ...getColumnSearchProps('cel')
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

    ]);
    const [search, setSearch] = useState({
        searchText: '',
        searchedColumn: '',
      })

   
    const updateDonadorAndGenPdf = async (donador) => {
        console.log('donador', donador);

        let updDonador = await axios.post(`/donador/updDonador`, {id_donador: donador.id_donador, id_campana: donador.id_campana})
        if(updDonador.data.ok) {
            Swal.fire({
                title: "¡Éxito!",
                text: "Comprobante generado con éxito. Haz clic en OK para descargarlo.",
                icon: "success",
            }).then(() => {
                dispatch({
                    type: "TRIGGER_ACTION",
                    item: 'ReloadDonadores'
                })
                generarConstancia(donador.nombre);
            })
        }
    }

    useEffect(() => {
        if (tipo === 'predonante') {
            setColumns([...columns,
            {
                title: "Acción",
                dataIndex: "",
                key: "accion",
                render: (record) => (
                    <Button key={`button-${record.id}`} type="primary" shape="round" size='middle' ghost onClick={() => updateDonadorAndGenPdf(record)}> Generar constancia </Button>
                )
            }])
        }
    }, [tipo])




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