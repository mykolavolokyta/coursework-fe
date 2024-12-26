import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetShipmentByIdQuery } from '../../../api/shipmentsApi';
import {Typography, Table, List} from 'antd';
import DownloadInvoiceButton from "../../DownloadInvoiceButton/DownloadInvoiceButton";

const { Title } = Typography;

const ShipmentDetailsPage = () => {
    const { id } = useParams();
    const { data: shipment, isLoading, error } = useGetShipmentByIdQuery(id);

    const columns = [
        {
            title: 'Назва товару',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Кількість',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];



    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div>Сталася помилка при отриманні даних.</div>;
    }

    const mapStatus = (status) => {
        if (status === 'Pending') {
            return 'В очікуванні';
        }
        if (status === 'Delivered') {
            return 'Доставлено';
        }
        return 'Втрачено';
    }

    const shipmentDetails = [
        { label: 'ID', value: shipment.id },
        { label: 'Отримувач', value: shipment.recipient },
        { label: 'Відповідальний', value: shipment.responsibleUser?.username || 'Невідомо' },
        { label: 'Статус', value: mapStatus(shipment.status) },
        { label: 'Час створення', value: new Date(shipment.createdAt).toLocaleString() },
        { label: 'Час оновлення', value: new Date(shipment.updatedAt).toLocaleString() },
    ];

    return (
        <div className="container">
            <Title level={2}>Деталі відправлення</Title>
            <List
                style={{ marginBottom: '20px' }}
                bordered
                dataSource={shipmentDetails}
                renderItem={item => (
                    <List.Item>
                        <strong>{item.label}:</strong> {item.value}
                    </List.Item>
                )}
            />
            <DownloadInvoiceButton/>
            <Title level={3} style={{ marginTop: '20px' }}>Список товарів</Title>
            <Table
                dataSource={shipment.items.map(item => ({
                    name: item.product.name,
                    quantity: item.quantity
                }))}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
        </div>
    );
};

export default ShipmentDetailsPage;
