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
        url: '/api/user/email',
        method: 'PUT',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    changeUserPassword: builder.mutation({
      query: (password) => ({
        url: '/api/user/password',
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
  }),
});

export const {
  useGetUsersQuery,
  useChangeUserEmailMutation,
  useChangeUserPasswordMutation,
  useDeleteUserMutation,
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
