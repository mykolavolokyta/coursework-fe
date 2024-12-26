import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const CenteredMessage = () => {
    const {logout} = useAuth0();
    const containerStyles = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px",
        fontWeight: "bold",
    };

    const buttonStyles = {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    };

    return (
        <div style={containerStyles}>
            У вас немає ролі. Зверніться до адміністратора
            <button style={buttonStyles} onClick={logout}>
                Вийти
            </button>
        </div>
    );
};

export default CenteredMessage;
