import './App.css';
import {useAuth0} from "@auth0/auth0-react";
import {useAuthLogin} from "./api/authApi";
import {Route, Routes} from 'react-router-dom';
import {Layout} from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import {isAdmin, isWorker} from "./utils/isAdmin";
import {useEffect} from "react";
import {sec} from "./security";
import ProductsPage from "./components/pages/ProductsPage/ProductsPage";
import ReceivementsPage from "./components/pages/ReceivementsPage/ReceivementsPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import CreateShipmentPage from "./components/pages/CreateShipmentPage/CreateShipmentPage";
import ShipmentsPage from "./components/pages/ShipmentsPage/ShipmentsPage";
import CreateReceivementPage from "./components/pages/CreateReceivementPage/CreateReceivementPage";
import AnalyticsPage from "./components/pages/AnalyticsPage/AnalyticsPage";
import UploadReceivementPage from "./components/pages/UploadReceivementPage/UploadReceivementPage";
import ShipmentDetailsPage from "./components/pages/ShipmentDetailsPage/ShipmentDetailsPage";
import UnauthorizedUserMessage from "./components/UnauthorizedUserMessage/UnauthorizedUserMessage";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const {Content} = Layout;

function App() {
    const {
        getAccessTokenSilently,
        getIdTokenClaims,
        isAuthenticated,
        error,
        isLoading,
        loginWithRedirect,
        user,
        logout,
    } = useAuth0();

    useEffect(() => {
        sec.setAccessTokenSilently(getAccessTokenSilently);
    }, [getAccessTokenSilently]);
    sec.setIdTokenSilently(async () => {
        const idTokenClaims = await getIdTokenClaims();
        return idTokenClaims?.__raw;
    });

    const {authLogin} = useAuthLogin();

    if (error) {
        return <div>{error.message}</div>
    }
    if (isLoading) {
        return <LoadingScreen/>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
    }

    authLogin();

    if (!isAdmin(user) && !isWorker(user)) {
        return <UnauthorizedUserMessage/>;
    }

    return (
        <div className="App">
            <Layout style={{minHeight: '100vh'}}>
                <Sidebar isAdmin={isAdmin(user)} handleLogout={logout}/>
                <Layout>
                    <Content style={{padding: '20px'}}>
                        <Routes>
                            {
                                (isAdmin(user) || isWorker(user)) && <>
                                    <Route path="/" element={<ProductsPage/>}/>
                                    <Route path="/receivement/create" element={<CreateReceivementPage/>}/>
                                    <Route path="/receivement/upload" element={<UploadReceivementPage/>}/>
                                    <Route path="/receivement" element={<ReceivementsPage/>}/>
                                    <Route path="/shipment/create" element={<CreateShipmentPage/>}/>
                                    <Route path="/shipment" element={<ShipmentsPage/>}/>
                                    <Route path="/shipment/:id" element={<ShipmentDetailsPage />} />
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                </>
                            }
                            {
                                isAdmin(user) && <>
                                    <Route path="/analytics" element={<AnalyticsPage/>}/>
                                    <Route path="/employees" element={<UsersPage/>}/>
                                </>
                            }
                            <Route path="*" element={<div>AAAA</div>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
