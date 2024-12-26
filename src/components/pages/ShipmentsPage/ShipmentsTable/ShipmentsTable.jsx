import React, {useState} from "react";
import {Table, Tag, Space, Button, Modal, Form, Select, message} from "antd";
import {
    useGetShipmentsQuery,
    useUpdateShipmentStatusMutation
} from "../../../../api/shipmentsApi";
import {useNavigate} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import LoadingScreen from "../../../LoadingScreen/LoadingScreen";

const ShipmentTable = () => {
    const {data: shipments, isLoading, error} = useGetShipmentsQuery();
    const [updateShipment] = useUpdateShipmentStatusMutation();
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingShipment, setEditingShipment] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingScreen/>;
    }

    if (error) {
        return <div>Failed to load shipments. Please try again later.</div>;
    }

    const handleEdit = (record) => {
        setEditingShipment(record);
        form.setFieldsValue({status: record.status});
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            await updateShipment({id: editingShipment.id, status: values.status}).unwrap();
            message.success("Статус відправлення оновлено успішно!");
            setIsModalVisible(false);
        } catch (error) {
            console.error(error);
            message.error("Не вдалося оновити статус відправлення.");
        }
    };

    const mapStatus = (status) => {
        if (status === 'Pending') {
            return 'В очікуванні';
        }
        if (status === 'Delivered') {
            return 'Доставлено';
        }
        return 'Втрачено';
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
                const color =
                    status === "Pending"
                        ? "gold"
                        : status === "Delivered"
                            ? "green"
                            : "red";
                return <Tag color={color}>{mapStatus(status).toUpperCase()}</Tag>;
            },
        },
        {
            title: "Дії",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined/>}
                        type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            return handleEdit(record)
                        }}
                            />
                            </Space>
                            ),
                        },
                            ];

                            return (
                            <>
                            <Table
                            columns={columns}
                        dataSource={shipments}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        onChange={(pagination) => setPagination(pagination)}
                        onRow={(record) => ({
                            onClick: () => navigate(`/shipment/${record.id}`),
                        })}
                        style={{cursor: "pointer"}}
                    />
                    <Modal
                        title="Редагувати статус відправлення"
                        visible={isModalVisible}
                        onOk={handleUpdate}
                        onCancel={() => setIsModalVisible(false)}
                        okText="Оновити"
                        cancelText="Скасувати"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="status"
                                label="Статус"
                                rules={[{required: true, message: "Оберіть статус!"}]}
                            >
                                <Select>
                                    <Select.Option value="Pending">В очікуванні</Select.Option>
                                    <Select.Option value="Delivered">Доставлено</Select.Option>
                                    <Select.Option value="Lost">Втрачено</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            );
        };

export default ShipmentTable;
