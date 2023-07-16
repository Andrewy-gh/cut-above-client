import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: { rescheduling: false, cancelId: null },
  reducers: {
    beginRescheduling(state, action) {
      state.rescheduling = true;
      state.cancelId = action.payload;
    },
    endRescheduling(state) {
      state.rescheduling = false;
      state.cancelId = null;
    },
  },
});

export const { beginRescheduling, endRescheduling } = appointmentSlice.actions;

export default appointmentSlice.reducer;

export const selectRescheduling = (state) => state.appointment.rescheduling;
export const selectCancelId = (state) => state.appointment.cancelId;
