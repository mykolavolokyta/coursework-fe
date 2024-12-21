import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sec } from "../security";

export const analyticsApi  = createApi({
    reducerPath: "analyticsApi ",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/analytics`,
        prepareHeaders: async (headers) => {
            const idToken = await sec.getIdTokenSilently()();
            if (idToken) {
                headers.set("Authorization", `Bearer ${idToken}`);
            }
            headers.set("accept", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: () => '/',
        }),
    }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
