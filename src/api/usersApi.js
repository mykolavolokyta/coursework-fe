import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sec } from '../security';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/user`,
        prepareHeaders: async (headers) => {
            const idToken = await sec.getIdTokenSilently()();
            if (idToken) {
                headers.set('Authorization', `Bearer ${idToken}`);
            }
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/all',
        }),
        editUser: builder.mutation({
            query: (updatedUser) => ({
                url: `/${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useEditUserMutation } = usersApi;
