import React, { useState, useEffect } from "react";
import {
  Skeleton, Divider, Tabs, Row, Col, Typography, Select
} from "antd";
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, CategoryScale } from "react-chartjs-2";
import { useStateValue } from "../../providers/StateProvider";
import { useGetRequest } from "../../hooks";
import { usePostRequest } from "../../hooks";


export default function Reportes() {
  const [idCampana, setIdCampana] = useState(1);
  const [{ triggerGraph }, dispatch] = useStateValue();
  const { data: campanas } = useGetRequest(`/campaign/getCamps`, []);
  // NO FUNCIONA PARA GRAFICAR const { data } = usePostRequest('/graph/ByPreDon', { id_campana: idCampana }, [idCampana, triggerGraph]);
  const { data: bbt } = usePostRequest('/graph/ByBloodType', { id_campana: idCampana }, [idCampana, triggerGraph]);
  const { data: bsfd } = usePostRequest('/graph/ByStForDon', { id_campana: idCampana }, [idCampana, triggerGraph]);
  const { data: bsfpd } = usePostRequest('/graph/ByStForPreDon', { id_campana: idCampana }, [idCampana, triggerGraph]);
  const { data: unpd } = usePostRequest('/graph/ByUniPreDon', { id_campana: idCampana }, [idCampana, triggerGraph]);
  const { data: bcd } = usePostRequest('/graph/ByCarrDon', { id_campana: idCampana }, [idCampana, triggerGraph]);

  let labelBT = bbt?.map((tipo) => tipo.blood_type)
  let dataBT = bbt?.map((can) => can.cantidad)

  let labelBSFD = bsfd?.map((es) => es.estudiante)
  let dataBSFD = bsfd?.map((amount) => amount.amount)

  let labelBSFP = bsfpd?.map((es) => es.estudiante)
  let dataBSFP = bsfpd?.map((amount) => amount.amount)

  let labelUNPD = unpd?.map((nom) => nom.nombre)
  let dataUNPD = unpd?.map((amount) => amount.amount_pre)

  let labelUND = unpd?.map((nom) => nom.nombre)
  let dataUND = unpd?.map((amount) => amount.amount_don)

  let labelBCD = bcd?.map((nom) => nom.nombre)
  let dataBCD = bcd?.map((amount) => amount.amount)

  const chartByPreDon = {
    data: {
      labels: data.map((e) => e),
      datasets: [
        {
          data: data.map((e) => e.predonantes),
          backgroundColor: [
            "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const ByBloodType = {
    data: {
      labels: labelBT,
      datasets: [
        {
          data: dataBT,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const ByStForDon = {
    data: {
      labels: labelBSFD,
      datasets: [
        {
          data: dataBSFD,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const ByStForPreDon = {
    data: {
      labels: labelBSFP,
      datasets: [
        {
          data: dataBSFP,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const ByUniPreDon = {
    data: {
      labels: labelUNPD,
      datasets: [
        {
          data: dataUNPD,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const ByUniDon = {
    data: {
      labels: labelUND,
      datasets: [
        {
          data: dataUND,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };

  const ByCarrDon = {
    data: {
      labels: labelBCD,
      datasets: [
        {
          data: dataBCD,
          backgroundColor: [
            "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4", "#1a535c",
            "#4ecdc4",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      }
    },
  };
  const titleStyle = {
    textAlign: "center",
    marginBottom: 25,
  };

  return (
    <>
      <Divider>
        <h3>Reportes</h3>
      </Divider>
      <div className="card-container">

        <Typography.Title level={2}>¿Qué campaña deseas consultar?</Typography.Title>
        <Select style={{ width: 450 }} defaultValue={campanas[0]?.id || 1} placeholder='Selecciona una opción' onChange={(camp) => {
          console.log('camp', camp);
          setIdCampana(camp);
        }}>
          {campanas.map(campana => (
            <Select.Option key={campana.id} value={campana.id}>{campana.nombre}</Select.Option>
          ))}
        </Select>
        <Row gutter={[8, 24]} justify="center">
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Donantes vs. Pre donantes
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={chartByPreDon.data}
                options={chartByPreDon.options}
              />
            </div>
          </Col>
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Por tipo de sangre
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByBloodType.data}
                options={ByBloodType.options}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 24]} justify="center">
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Estudiantes donadores
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByStForDon.data}
                options={ByStForDon.options}
              />
            </div>
          </Col>
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Estudiantes PreFonadores
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByStForPreDon.data}
                options={ByStForPreDon.options}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 24]} justify="center">
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Universidades Predonadores
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByUniPreDon.data}
                options={ByUniPreDon.options}
              />
            </div>
          </Col>
          <Col span={9}>
          <Typography.Title level={4} style={titleStyle}>
              Universidades donadores
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByUniDon.data}
                options={ByUniDon.options}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 24]} justify="center">
          <Col span={9}>
            <Typography.Title level={4} style={titleStyle}>
              Donadores por carrera
            </Typography.Title>
            <div style={{ width: '80%' }} >
              <Bar
                data={ByCarrDon.data}
                options={ByCarrDon.options}
              />
            </div>
          </Col>
          </Row>
      </div>,
    </>
  );
}