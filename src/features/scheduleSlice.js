import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';
import { selectEmployeeIds } from './employeeSlice';
import { selectDate, selectEmployee, selectService } from './filterSlice';
import {
  checkIsBefore,
  convertUtcToEst,
  currentDate,
  findAvailableTimeSlots,
  formatDate,
  formatDateFull,
  formatDateToTime,
} from '../utils/date';

const scheduleAdapter = createEntityAdapter({});

const initialState = scheduleAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query({
      query: () => '/api/schedules',
      transformResponse: (responseData) => {
        const loadedPosts = responseData
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((s) => {
            const appointments = s.appointments.map((appt) => ({
              ...appt,
              date: formatDateFull(appt.date),
            }));
            return {
              ...s,
              appointments,
            };
          });
        return scheduleAdapter.setAll(initialState, loadedPosts);
      },
      // keepUnusedDataFor: 5,
      providesTags: ['Schedule'],
    }),
    getDashboardSchedules: builder.query({
      query: () => '/api/schedules/dashboard',
      transformResponse: (responseData) => {
        const loadedPosts = responseData
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((s) => {
            const appointments = s.appointments
              .toSorted((a, b) => new Date(a.start) - new Date(b.start))
              .map((appt) => ({
                ...appt,
                date: formatDateFull(appt.date),
                start: formatDateToTime(appt.start),
                end: formatDateToTime(appt.end),
              }));
            return {
              id: s.id,
              date: formatDateFull(s.date),
              open: formatDateToTime(s.open),
              close: formatDateToTime(s.close),
              appointments,
            };
          });
        return loadedPosts;
      },
    }),
    addSchedule: builder.mutation({
      query: (schedule) => ({
        url: '/api/schedules',
        method: 'POST',
        body: schedule,
      }),
      invalidatesTags: ['Appointment', 'Schedule'],
    }),
    updateSchedule: builder.mutation({
      query: (schedule) => ({
        url: `/api/schedules/${schedule.id}`,
        method: 'PUT',
        body: schedule,
      }),
      invalidatesTags: ['Appointment', 'Schedule'],
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useGetDashboardSchedulesQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
} = extendedApiSlice;

export const selectScheduleResult =
  extendedApiSlice.endpoints.getSchedule.select();

const selectScheduleData = createSelector(
  selectScheduleResult,
  (scheduleResult) => scheduleResult.data
);

export const { selectAll: selectAllSchedule, selectById: selectScheduleById } =
  scheduleAdapter.getSelectors(
    (state) => selectScheduleData(state) ?? initialState
  );

export const selectScheduleByDate = createSelector(
  selectAllSchedule,
  selectDate,
  // selectDateDisabled,
  // add dateDisabled to below
  (schedule, date) => {
    const currentEstTime = convertUtcToEst(currentDate);
    const formattedCurrentDate = formatDate(currentEstTime);
    const inputDate = formatDate(date);
    if (inputDate === formattedCurrentDate) {
      // prevents user from making appointments after closing time if searching for current day appointments
      return schedule.find(
        (s) => s.date === date && checkIsBefore(currentDate, s.close) // currentDate holds the hours and minutes, currentDate and s.close are in UTC
      );
    } else {
      return schedule.find((s) => s.date === date);
    }
  }
);

export const selectScheduleByFilter = createSelector(
  selectScheduleByDate,
  selectService,
  selectEmployeeIds,
  selectEmployee,
  (schedule, service, employees, employee) => {
    console.log('====================================');
    console.log('schedule in slice: ', schedule);
    console.log('====================================');
    if (!schedule) {
      return [];
    }
    const availableTimeSlots = findAvailableTimeSlots(
      schedule,
      service.duration,
      employees,
      employee
    );
    return availableTimeSlots;
  }
);
