import React, {useState} from 'react';
import {Form, Input, Button, Modal, message} from 'antd';
import {useCreateReceivementMutation} from "../../../api/receivementsApi";

const CreateReceivementPage = () => {
    const [form] = Form.useForm();
    const [createReceivement] = useCreateReceivementMutation();
    const [productFormVisible, setProductFormVisible] = useState(false);
    const [newProductDetails, setNewProductDetails] = useState(null);

    const handleSubmit = async (values) => {
        try {
            const response = await createReceivement({
                ...values,
                quantity: Number(values.quantity),
            }).unwrap();
            if (response.newProductRequired) {
                setNewProductDetails({
                    ...values
                });
                setProductFormVisible(true);
            } else {
                message.success('Отримання успішно створено!');
                form.resetFields();
            }
        } catch (error) {
            message.error('Не вдалося створити отримання. Спробуйте ще раз.');
        }
    };

    const handleAddNewProduct = async (values) => {
        try {
            await createReceivement({
                ...newProductDetails,
                quantity: Number(newProductDetails.quantity),
                category: values.category,
                weight: Number(values.weight),
            }).unwrap();
            message.success('Новий продукт додано та отримання створено!');
            setProductFormVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Не вдалося додати новий продукт.');
        }
    };

    return (
        <div className="container">
            <h2>Створення отримання</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{quantity: 1}}
            >
                <Form.Item
                    label="Відправник"
                    name="supplier"
                    rules={[{required: true, message: 'Будь ласка, вкажіть відправника!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Назва товару"
                    name="productName"
                    rules={[{required: true, message: 'Будь ласка, вкажіть назву товару!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Кількість"
                    name="quantity"
                    rules={[{required: true, message: 'Будь ласка, вкажіть кількість!'}]}
                >
                    <Input type="number" min={1}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Додати новий продукт"
                visible={productFormVisible}
                onCancel={() => setProductFormVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleAddNewProduct}>
                    <Form.Item
                        label="Категорія"
                        name="category"
                        rules={[{required: true, message: 'Будь ласка, вкажіть категорію!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Вага (кг)"
                        name="weight"
                        rules={[{required: true, message: 'Будь ласка, вкажіть вагу продукту!'}]}
                    >
                        <Input type="number" min={0.1} step={0.1}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Зберегти продукт
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreateReceivementPage;
