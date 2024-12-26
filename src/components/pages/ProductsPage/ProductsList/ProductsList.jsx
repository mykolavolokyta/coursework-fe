import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Table} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {useUpdateProductMutation} from "../../../../api/productsApi";

const ProductList = ({products, refetch}) => {
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const [form] = Form.useForm();

    const showEditModal = (product) => {
        setProductToEdit(product);
        form.setFieldsValue(product);
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = () => {
        form.validateFields()
            .then((values) => {
                updateProduct({ ...productToEdit, ...values })
                    .unwrap()
                    .then(() => {
                        refetch();
                        setIsEditModalVisible(false);
                        setProductToEdit(null);
                    })
                    .catch((error) => {
                        console.error('Update failed:', error);
                    });
            })
            .catch((errorInfo) => {
                console.error('Validation Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
        setProductToEdit(null);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Кількість',
            dataIndex: 'quantityInStock',
            key: 'quantityInStock',
        },
        {
            title: 'Категорія',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Вага (кг)',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Дії',
            key: 'actions',
            render: (_, record) => (
                <div style={{display: 'flex', gap: '8px'}}>
                    <Button
                        icon={<EditOutlined/>}
                        type="link"
                        onClick={() => showEditModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                pagination={{pageSize: 10}}
            />

            <Modal
                title="Редагувати"
                visible={isEditModalVisible}
                onCancel={handleCancel}
                onOk={handleEditSubmit}
                confirmLoading={isUpdating}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={productToEdit}
                    disabled={isUpdating}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Назва"
                        name="name"
                        rules={[{required: true, message: 'Please input the product name!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Кількість на складі"
                        name="quantityInStock"
                        rules={[{required: true, message: 'Please input the quantity!'}]}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Категорія"
                        name="category"
                        rules={[{required: true, message: 'Please input the category!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Вага"
                        name="weight"
                        rules={[{required: true, message: 'Please input the weight!'}]}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default ProductList;
