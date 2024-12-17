import {useAuth0} from "@auth0/auth0-react";

export const useFetchFromApi = () => {
    const {getIdTokenClaims} = useAuth0();
    const fetchFromApi = async ({url, method, body}) => {
        const user = await getIdTokenClaims();
        return await window.fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${user?.__raw || ""}`
            },
            body
        });
    }

    return {fetchFromApi};
}