import React from 'react';
import {useGetAnalyticsQuery} from "../../../api/analyticsApi";
import { Card, Col, Row, Table } from 'antd';

const AnalyticsPage = () => {
    const { data: analytics, isLoading, error } = useGetAnalyticsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading analytics</div>;
    }

    const columns = [
        {
            title: 'Назва товару',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Товару відправлено',
            dataIndex: 'productsShipped',
            key: 'productsShipped',
        },
        {
            title: 'Кількість відправлень',
            dataIndex: 'shipmentsCount',
            key: 'shipmentsCount',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Аналітика</h1>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Загальна кількість отримань" bordered>
                        {analytics.totalReceivings}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Загальна кількість відправлень" bordered>
                        {analytics.totalShipments}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Загальна кількість працівників" bordered>
                        {analytics.totalWorkers}
                    </Card>
                </Col>
            </Row>

            <h2 style={{ marginTop: '20px' }}>Топ товарів</h2>
            <Table
                columns={columns}
                dataSource={analytics.topProducts.map((item, index) => ({
                    key: index,
                    productName: item.name,
                    productsShipped: item.productsshipped,
                    shipmentsCount: item.shipmentscount,
                }))}
                pagination={false}
            />
        </div>
    );
};

export default AnalyticsPage;
