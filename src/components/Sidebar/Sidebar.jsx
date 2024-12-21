import React from 'react';
import {Button, Layout, Menu} from 'antd';
import {
    AppstoreAddOutlined,
    BoxPlotOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import {Link} from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";

const {Sider} = Layout;

const Sidebar = ({isAdmin, handleLogout}) => {
    return (
        <Sider width={240} className="site-layout-background">
            <div className="logo" style={{padding: '16px', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>
                Warehouse Panel
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="1" icon={<AppstoreAddOutlined/>}>
                    <Link to={"/"}/>
                    Огляд товарів
                </Menu.Item>
                <SubMenu key="sub-receiving" icon={<BoxPlotOutlined/>} title="Отримання">
                    <Menu.Item key="2-1">
                        <Link to={"/receivement/create"}/>
                        Створити
                    </Menu.Item>
                    <Menu.Item key="2-2">
                        <Link to={"/receivement/upload"}/>
                        Завантажити
                    </Menu.Item>
                    <Menu.Item key="2-3">
                        <Link to={"/receivement"}/>
                        Перегляд
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub-shipping" icon={<AppstoreAddOutlined/>} title="Відправлення">
                    <Menu.Item key="3-1">
                        <Link to={"/shipment/create"}/>
                        Створити
                    </Menu.Item>
                    <Menu.Item key="3-2">
                        <Link to={"/shipment"}/>
                        Перегляд
                    </Menu.Item>
                </SubMenu>
                {isAdmin && <Menu.Item key="4" icon={<BoxPlotOutlined/>}>
                    <Link to={"/analytics"}/>
                    Аналітика
                </Menu.Item>}
                <Menu.Item key="5" icon={<UserOutlined/>}>
                    <Link to={"/profile"}/>
                    Профіль
                </Menu.Item>
                {isAdmin && <Menu.Item key="6" icon={<TeamOutlined/>}>
                    <Link to={"/employees"}/>
                    Працівники
                </Menu.Item>}
            </Menu>

            <div style={{position: 'absolute', bottom: '16px', width: '100%', padding: '16px'}}>
                <Button
                    type="primary"
                    danger
                    onClick={handleLogout}
                    style={{width: '100%'}}
                >
                    Вийти
                </Button>
            </div>
        </Sider>
    );
};

export default Sidebar;
