import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {sec} from "../security";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/product`,
        prepareHeaders: async (headers, { getState }) => {
            const accessToken = await sec.getAccessTokenSilently()();
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            headers.set('Content-Type', 'application/json');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query( {
            query: (search = '') => ({
                url: '/all',
                params: { search },
            }),
            providesTags: ['Products'],
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/product',
                method: 'POST',
                body: newProduct,
            }),
        }),
        updateProduct: builder.mutation({
            query: (updatedProduct) => ({
                url: `/${updatedProduct.id}`,
                method: 'PUT',
                body: updatedProduct,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
