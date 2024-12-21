import React, {useState} from 'react';
import {Table, Button, Modal, Form, Input, message, Select} from 'antd';
import {useEditUserMutation, useGetUsersQuery} from "../../../../api/usersApi";

const UsersTable = () => {
    const {data: users, isLoading, error, refetch} = useGetUsersQuery();
    const [editUser] = useEditUserMutation();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEditClick = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
        form.resetFields();
    };

    const handleSave = async (values) => {
        try {
            await editUser({id: editingUser.id, ...values}).unwrap();
            refetch();
            message.success('Користувача успішно оновлено!');
            setIsModalVisible(false);
            setEditingUser(null);
        } catch (err) {
            console.error('Error updating user:', err);
            message.error('Не вдалося оновити користувача.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Помилка завантаження користувачів</div>;
    }

    const columns = [
        {
            title: 'Електронна пошта',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Ім'я користувача",
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (role) => mapRole(role),
        },
        {
            title: 'Дії',
            key: 'actions',
            render: (_, user) => (
                <Button type="link" onClick={() => handleEditClick(user)}>
                    Редагувати
                </Button>
            ),
        },
    ];

    const mapRole = (role) => {
        if (role.includes('admin')) {
            return 'Адміністратор';
        }
        if (role.includes('worker')) {
            return 'Працівник';
        }
        return 'Без ролі';
    };

    const roleOptions = [
        {label: "Без ролі", value: ""},
        { label: 'Працівник', value: 'worker' },
        { label: 'Адміністратор', value: 'admin' },
    ];

    return (
        <div className="container">
            <Table
                dataSource={users}
                columns={columns}
                rowKey={(record) => record.id}
            />
            <Modal
                title="Редагувати користувача"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={editingUser}
                >
                    <Form.Item
                        label="Електронна пошта"
                        name="email"
                        rules={[{type: 'email', message: 'Неправильний формат електронної пошти!'}]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Ім'я користувача"
                        name="username"
                        rules={[{message: "Ім'я користувача не може бути порожнім!"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Роль"
                        name="role"
                    >
                        <Select>
                            {roleOptions.map((option) => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersTable;
