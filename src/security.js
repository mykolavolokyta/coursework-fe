let getAccessTokenSilently;
let getIdTokenSilently;

export const sec = {
    getAccessTokenSilently: () => getAccessTokenSilently,
    setAccessTokenSilently: (func) => {
        getAccessTokenSilently = func;
    },
    getIdTokenSilently: () => getIdTokenSilently,
    setIdTokenSilently: (func) => {
        getIdTokenSilently = func;
    },
};