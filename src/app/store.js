import {configureStore} from '@reduxjs/toolkit';
import {productsApi} from "../api/productsApi";
import {profileApi} from "../api/profileApi";
import {usersApi} from "../api/usersApi";
import {shipmentsApi} from "../api/shipmentsApi";
import {receivementsApi} from "../api/receivementsApi";
import {analyticsApi} from "../api/analyticsApi";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [shipmentsApi.reducerPath]: shipmentsApi.reducer,
        [receivementsApi.reducerPath]: receivementsApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(profileApi.middleware)
            .concat(usersApi.middleware)
            .concat(shipmentsApi.middleware)
            .concat(receivementsApi.middleware)
            .concat(analyticsApi.middleware),
});