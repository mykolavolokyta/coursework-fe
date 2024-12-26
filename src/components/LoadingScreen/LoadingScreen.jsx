import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = ({ message = "Завантаження..." }) => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
    };

    return (
        <div style={style}>
            <Spin size="large" />
            <p style={{ marginTop: '16px', fontSize: '16px', color: '#555' }}>{message}</p>
        </div>
    );
};

export default LoadingScreen;
