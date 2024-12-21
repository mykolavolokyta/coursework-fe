import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import {downloadInvoice} from "../../api/invoiceApi";

const DownloadInvoiceButton = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsLoading(true);

            const invoiceBlob = await downloadInvoice(id);

            const url = window.URL.createObjectURL(invoiceBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${id}.pdf`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            notification.error({ message: 'Сталася помилка при завантаженні накладної.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button type="primary" onClick={handleDownload} loading={isLoading}>
            Завантажити накладну
        </Button>
    );
};

export default DownloadInvoiceButton;
