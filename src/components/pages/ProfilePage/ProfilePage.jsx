import React from 'react';
import {useGetProfileQuery, useEditProfileMutation} from '../../../api/profileApi';
import {Form, Input, Button, message} from 'antd';

const ProfilePage = () => {
    const {data: profile, isLoading, error} = useGetProfileQuery();
    console.log(error);
    const [editProfile] = useEditProfileMutation();
    const [form] = Form.useForm();

    const mapRole = (role) => {
        return role.includes('admin') ? 'Адміністратор' : 'Працівник';
    };

    const handleSubmit = async (values) => {
        try {
            await editProfile(values).unwrap();
            message.success('Профіль оновлено!');
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error('Не вдалося оновити профіль');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Мій профіль</h1>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    ...profile,
                    role: mapRole(profile?.role)
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Електронна пошта"
                    name="email"
                    rules={[{type: 'email', message: 'Invalid email!'}]}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Ім'я користувача"
                    name="username"
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="Роль" name="role">
                    <Input disabled/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зберегти зміни
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfilePage;
