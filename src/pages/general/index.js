import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from '../../layouts/Sidebar';
import Registrar from '../../components/formulario/registrar';
export default function Index() {
    const { Header, Content, Footer } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const theme = 'dark';
    return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout>
                    <Header style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme === "light" ? "#fff" : "" }}>
                        <div>
                            <h2 className="text-white" style={{ color: 'white' }}>Administrador</h2>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
                        <Routes>
                            <Route path="registro" element={<Registrar />} />
                            <Route path="donadores" element={<Registrar />} />
                            <Route path="reportes" element={<Registrar />} />
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Sistema VIDAS 1.0.0 © 2021</Footer>
                </Layout>
            </Layout>
    );
}