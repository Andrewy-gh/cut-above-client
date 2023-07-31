import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';
import { formatDateSlash, formatDateToTime } from '../../utils/date';

const appointmentAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = appointmentAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: () => '/api/appointment',
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((appt) => ({
          ...appt,
          date: formatDateSlash(appt.date),
          start: formatDateToTime(appt.start),
        }));
        return appointmentAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: ['Appointment'],
    }),
    getSingleAppointment: builder.query({
      query: (id) => `/api/appointment/${id}`,
      transformResponse: (responseData) => {
        return {
          ...responseData,
          date: formatDateSlash(responseData.date),
          start: formatDateToTime(responseData.start),
        };
      },
      providesTags: ['Appointment'],
    }),
    addAppointment: builder.mutation({
      query: (appointment) => ({
        url: '/api/appointment',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: ['Appointment', 'Schedule'],
    }),
    updateAppointment: builder.mutation({
      query: (appointment) => ({
        url: `/api/appointment/${appointment.id}`,
        method: 'PUT',
        body: appointment,
      }),
      invalidatesTags: ['Appointment', 'Schedule'],
    }),
    cancelAppointment: builder.mutation({
      query: (appointment) => ({
        url: `/api/appointment/${appointment.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetAppointmentQuery,
  useGetSingleAppointmentQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
} = extendedApiSlice;

export const selectAppointmentResult =
  extendedApiSlice.endpoints.getAppointment.select();

const selectAppointmentData = createSelector(
  selectAppointmentResult,
  (AppointmentResult) => AppointmentResult.data
);

export const {
  selectAll: selectAllAppointment,
  selectById: selectAppointmentById,
} = appointmentAdapter.getSelectors(
  (state) => selectAppointmentData(state) ?? initialState
);
