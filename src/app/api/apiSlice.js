import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logoutUser } from '../../features/auth/authSlice';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://cutaboveshop.fly.dev'
    : 'http://localhost:3001';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }

  //   return headers;
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('====================================');
  console.log('query result', result);
  console.log('====================================');
  if (result?.error?.data?.error === 'Session expired, please log in') {
    api.dispatch(logoutUser());
    throw new Error(result?.error);
  }
  // if (result?.error?.data?.error === 'token expired') {
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery('/refresh', api, extraOptions);
  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;
  //     // store the new token
  //     api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //     // retry the original query with new access token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     console.log('logging out');
  //     api.dispatch(logoutUser());
  //   }
  // }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Appointment', 'Employee', 'Schedule', 'User'],
  endpoints: (builder) => ({}),
});
