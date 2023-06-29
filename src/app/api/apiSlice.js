import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://cutaboveshop-api.onrender.com',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
