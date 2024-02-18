import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/user',
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ['User'],
    }),
    changeUserEmail: builder.mutation({
      query: (email) => ({
        url: '/api/account/email',
        method: 'PUT',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    changeUserPassword: builder.mutation({
      query: (password) => ({
        url: '/api/account/password',
        method: 'PUT',
        body: password,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/api/user',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    resetUserPassword: builder.mutation({
      query: ({ id, token, newPassword }) => ({
        url: `/reset-pw/${id}/${token}`,
        method: 'PUT',
        body: { newPassword },
      }),
      invalidatesTags: ['User'],
    }),
    validateToken: builder.query({
      query: (req) => `/validation/${req.id}/${req.token}`,
      transformResponse: (responseData) => {
        return responseData;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useChangeUserEmailMutation,
  useChangeUserPasswordMutation,
  useDeleteUserMutation,
  useResetUserPasswordMutation,
  useValidateTokenQuery,
} = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
