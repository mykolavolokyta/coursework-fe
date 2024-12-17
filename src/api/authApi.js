import {useFetchFromApi} from "./utils";

const API_URL = process.env.REACT_APP_API_URL;

export const useAuthLogin = () => {
    const { fetchFromApi } = useFetchFromApi();

    const authLogin = () => {
        fetchFromApi({
            url: `${API_URL}/auth/login`,
            method: "POST"
        })
    }
    return { authLogin };
};