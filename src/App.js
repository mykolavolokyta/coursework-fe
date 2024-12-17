import './App.css';
import {useAuth0} from "@auth0/auth0-react";
import {authLogin, useAuthLogin} from "./api/authApi";

function App() {
    const {
        getIdTokenClaims,
        isAuthenticated,
        error,
        isLoading,
        loginWithRedirect,
        user,
        logout,
    } = useAuth0();

    const { authLogin } = useAuthLogin();

    if (error) {
        return <div>{error.message}</div>
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
    }

    const rolesKey = `${process.env.REACT_APP_JWT_CUSTOM_NAMESPACE}/roles`;
    const roles = user && user[rolesKey];

    authLogin();

    return (
        <div className="App">
            {roles ? roles.join(' ') : 'nn'}
        </div>
    );
}

export default App;
