import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/user',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = extendedApiSlice;

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
