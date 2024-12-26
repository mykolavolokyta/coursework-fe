import React, { useState } from 'react';
import {Table, InputNumber, Button, Form, message, Input} from 'antd';
import {useGetProductsQuery} from "../../../api/productsApi";
import {useCreateShipmentMutation} from "../../../api/shipmentsApi";

const ShipmentPage = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [createShipment] = useCreateShipmentMutation();
    const [form] = Form.useForm();
    const [shipmentItems, setShipmentItems] = useState([]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Помилка при завантаженні продуктів...</div>;
    }

    const handleQuantityChange = (productId, quantity) => {
        setShipmentItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === productId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                );
            }
            return [...prevItems, { productId, quantity }];
        });
    };

    const handleSubmit = async () => {
        const values = form.getFieldsValue();
        const shipmentData = {
            recipient: values.recipient,
            items: shipmentItems.filter((item) => item.quantity > 0),
        };

        try {
            await createShipment(shipmentData).unwrap();
            refetch();
            message.success('Відправлення успішно створено!');
            form.resetFields();
            setShipmentItems([]);
        } catch (error) {
            message.error('Не вдалося створити відправлення.');
        }
    };

    const columns = [
        {
            title: 'Назва товару',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Кількість на складі',
            dataIndex: 'quantityInStock',
            key: 'quantityInStock',
        },
        {
            title: 'Кількість для відвантаження',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={0}
                    max={record.quantityInStock}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            ),
        },
    ];

    return (
        <div className="container">
            <h1>Відправлення товарів</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Одержувач"
                    name="recipient"
                    rules={[{ required: true, message: 'Введіть одержувача' }]}
                >
                    <Input />
                </Form.Item>
                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                        Створити відправлення
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ShipmentPage;
