import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sec } from "../security";

export const shipmentsApi = createApi({
    reducerPath: "shipmentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/shipment`,
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
        getShipments: builder.query({
            query: () => "/all",
            providesTags: ['Shipments'],
        }),
        getShipmentById: builder.query({
            query: (id) => `/${id}`,
        }),
        createShipment: builder.mutation({
            query: (shipment) => ({
                url: '/create',
                method: 'POST',
                body: shipment,
            }),
            invalidatesTags: ['Shipments', "Products"],
        }),
        updateShipmentStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ['Shipments'],
        }),
    }),
});

export const { useGetShipmentsQuery, useGetShipmentByIdQuery, useCreateShipmentMutation, useUpdateShipmentStatusMutation  } = shipmentsApi;
