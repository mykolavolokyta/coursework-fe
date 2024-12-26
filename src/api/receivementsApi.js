import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {sec} from "../security";

export const receivementsApi = createApi({
    reducerPath: "receivementsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/receivement`,
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
        getReceivements: builder.query({
            query: () => "/all",
            providesTags: ['Receivements'],
        }),
        createReceivement: builder.mutation({
            query: (receivement) => ({
                url: '/create',
                method: 'POST',
                body: receivement,
            }),
            invalidatesTags: ['Receivements', "Products"],
        }),
        uploadCSV: builder.mutation({
            query: (file) => ({
                url: '/upload-csv',
                method: 'POST',
                body: file,
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data")
                    return headers
                },
            }),
            invalidatesTags: ['Receivements', "Products"],
        }),
    }),
});

export const {useGetReceivementsQuery, useCreateReceivementMutation, useUploadCSVMutation} = receivementsApi;
