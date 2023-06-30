import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const appointmentAdapter = createEntityAdapter({});

const initialState = appointmentAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: () => '/appointment',
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((appt) => ({
          ...appt,
          date: appt.date,
          title: appt.title,
        }));
        return appointmentAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: ['Appointment'],
    }),
  }),
});

export const { useGetAppointmentQuery } = extendedApiSlice;

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
