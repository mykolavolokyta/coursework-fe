import {sec} from "../security";

export const downloadInvoice = async (id) => {
    try {
        const idToken = await sec.getIdTokenSilently()();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/shipment/${id}/invoice`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Не вдалося завантажити накладну');
        }

        return await response.blob();
    } catch (error) {
        console.error('Помилка при завантаженні накладної:', error);
        throw error;
    }
};
