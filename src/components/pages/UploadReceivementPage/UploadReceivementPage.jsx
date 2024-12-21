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
            message.success('File uploaded successfully');
            setFile(null);
        } catch (error) {
            console.error(error);
            message.error('Failed to upload file');
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
            <h2>Upload CSV for Receiving</h2>
            <Upload {...props} accept=".csv">
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!file}
                loading={isLoading}
                style={{ marginTop: '10px' }}
            >
                Upload
            </Button>
        </div>
    );
};

export default UploadReceivementPage;
