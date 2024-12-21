import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDeleteProductMutation, useUpdateProductMutation} from "../../../../api/productsApi";

const ProductList = ({products, refetch}) => {
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();
    const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductMutation();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

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

    const showDeleteModal = (id) => {
        setProductToDelete(id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        deleteProduct(productToDelete)
            .unwrap()
            .then(() => {
                refetch();  // Refetch products after delete
                setIsDeleteModalVisible(false);
                setProductToDelete(null);
            })
            .catch((error) => {
                console.error('Delete failed:', error);
            });
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
        setIsDeleteModalVisible(false);
        setProductToEdit(null);
        setProductToDelete(null);
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
                    <Button
                        icon={<DeleteOutlined/>}
                        type="link"
                        danger
                        onClick={() => showDeleteModal(record.id)}
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
                title="Edit Product"
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
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input the product name!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Quantity In Stock"
                        name="quantityInStock"
                        rules={[{required: true, message: 'Please input the quantity!'}]}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{required: true, message: 'Please input the category!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Weight"
                        name="weight"
                        rules={[{required: true, message: 'Please input the weight!'}]}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirm Deletion"
                visible={isDeleteModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Скасувати
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={handleDeleteConfirm} loading={isDeleting}>
                        Видалити
                    </Button>,
                ]}
            >
                <p>Дійсно видалити цей товар?</p>
            </Modal>
        </>
    )
        ;
};

export default ProductList;
