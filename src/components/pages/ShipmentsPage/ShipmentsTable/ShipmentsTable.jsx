import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { useGetShipmentsQuery } from "../../../../api/shipmentsApi";
import { useNavigate } from 'react-router-dom';

const ShipmentTable = () => {
    const { data: shipments, isLoading, error } = useGetShipmentsQuery();
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Failed to load shipments. Please try again later.</div>;
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Отримувач",
            dataIndex: "recipient",
            key: "recipient",
        },
        {
            title: "Створено о",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: "Оновлено о",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: "Відповідальний",
            dataIndex: ["responsibleUser", "username"],
            key: "responsibleUser",
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const color = status === "Pending" ? "gold" : status === "Shipped" ? "blue" : "green";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <a href="/">Edit</a>
                    <a href="/">Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={shipments}
            rowKey={(record) => record.id}
            pagination={pagination}
            onChange={(pagination) => setPagination(pagination)}
            onRow={(record) => ({
                onClick: () => navigate(`/shipment/${record.id}`),
            })}
            style={{ cursor: 'pointer' }}
        />
    );
};

export default ShipmentTable;
