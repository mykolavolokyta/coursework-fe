import React from 'react';
import { Table, Typography } from 'antd';
import {useGetReceivementsQuery} from "../../../../api/receivementsApi";

const { Title } = Typography;

const ReceivementsTable = () => {
    const { data: receivements, isLoading, error } = useGetReceivementsQuery();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Постачальник',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Назва товару',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Кількість',
            dataIndex: 'quantity',
            key: 'product',
        },
        {
            title: 'Дата',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
    ];

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div>Сталася помилка при отриманні даних.</div>;
    }

    return (
        <div className="container">
            <Title level={2}>Список отримань</Title>
            <Table
                dataSource={receivements}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ReceivementsTable;
