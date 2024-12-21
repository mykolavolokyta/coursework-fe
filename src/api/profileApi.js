import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sec } from '../security';

export const profileApi = createApi({
    reducerPath: 'profileApi',
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
        getProfile: builder.query({
            query: () => '/profile',
        }),
        editProfile: builder.mutation({
            query: (updateData) => ({
                url: '/profile',
                method: 'PUT',
                body: updateData,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
