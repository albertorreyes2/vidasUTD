import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout, Row, Col } from 'antd';
import {
    UsergroupAddOutlined, FileSearchOutlined, AreaChartOutlined
} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/es-us';


export default function Sidebar({ collapsed, setCollapsed }) {

    const { SubMenu } = Menu;
    const { Sider } = Layout;
    const history = useNavigate();
    const handleMenu = title => {
        history(title);
    }
    const theme = 'dark';
    return (
        <Sider
            theme={theme}
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            breakpoint="md"

        // trigger={broken ? null : ""}
        // collapsedWidth={broken ? 0 : 80}
        // onBreakpoint={isBroken => {
        //     dispatch({
        //         type: 'TOGGLE_BREAKPOINT',
        //         item: { broken: isBroken }
        //     });
        // }}
        >

            <div style={{
                height: 64,
                // backgroundImage: `url(${collapsed ? logo2 : logo})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: theme === "dark" && "invert(1) brightness(200%)"
            }} />
            {/* <Scrollbars
                style={{ width: "auto" }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                thumbMinSize={30}
                universal={true}
            > */}
            <Menu theme={theme} mode="inline" inlineIndent={15}>
                <Menu.Item key="mi2" onClick={() => handleMenu("registro")} icon={<UsergroupAddOutlined />}>Registrar donador</Menu.Item>
                <Menu.Item key="mi3" onClick={() => handleMenu("donadores")} icon={<FileSearchOutlined />}>Ver donadores</Menu.Item>
                <Menu.Item key="mi4" onClick={() => handleMenu("reportes")} icon={<AreaChartOutlined />}>Reportes</Menu.Item>
            </Menu>
            {/* </Scrollbars> */}
        </Sider >
    );
}