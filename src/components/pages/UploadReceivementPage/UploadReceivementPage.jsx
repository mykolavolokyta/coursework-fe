import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useUploadCSVMutation} from "../../../api/receivementsApi";

const UploadReceivementPage = () => {
    const [file, setFile] = useState(null);
    const [uploadCSV, { isLoading }] = useUploadCSVMutation();

    const handleUpload = async () => {
        if (!file) {
            message.error('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await uploadCSV(formData).unwrap();
            message.success('Файл успішно завантажено');
            setFile(null);
        } catch (error) {
            console.error(error);
            message.error('Не вдалося завантажити файл');
        }
    };

    const props = {
        beforeUpload: (file) => {
            setFile(file);
            return false; // Prevent auto upload
        },
        onRemove: () => setFile(null),
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Завантажте файл з інформацію про прийняття товарів</h2>
            <Upload {...props} accept=".csv" maxCount={1}>
                <Button icon={<UploadOutlined />}>Обрати файл</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!file}
                loading={isLoading}
                style={{ marginTop: '10px' }}
            >
                Завантажити
            </Button>
        </div>
    );
};

export default UploadReceivementPage;
