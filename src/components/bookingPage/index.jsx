import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../datePickers/DatePicker';
import EmployeeSelect from '../employee/EmployeeSelect';
import ServiceSelect from './ServiceSelect';
import TimeSlots from './TimeSlots';
import { useAddAppointmentMutation } from '../../features/appointments/apptApiSlice';
import { useGetEmployeesQuery } from '../../features/employeeSlice';
import {
  selectDate,
  setDate,
  selectEmployee,
  selectService,
} from '../../features/filterSlice';
import {
  selectScheduleByDate,
  selectScheduleByFilter,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from '../../features/scheduleSlice';
import { currentDate, formatDate, oneMonthFromCurrent } from '../../utils/date';

import BookingDialog from './BookingDialog';
import CustomDialog from '../CustomDialog';

export default function BookPage() {
  const dispatch = useDispatch();
  const { data: employees } = useGetEmployeesQuery(); // done
  const { data: schedule } = useGetScheduleQuery(); // done
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState({});
  const employee = useSelector(selectEmployee); // done
  const date = useSelector(selectDate); // done
  const service = useSelector(selectService); // done
  const scheduleByDate = useSelector(selectScheduleByDate);
  const [addAppointment] = useAddAppointmentMutation();
  const [updateSchedule] = useUpdateScheduleMutation();

  const handleDateChange = (newDate) => {
    // done
    dispatch(setDate(newDate.toISOString()));
  };

  const timeSlots = useSelector(selectScheduleByFilter);

  const handleOpen = (data) => {
    console.log('handling open, data: ', data);
    setSelection(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleBooking = async (data) => {
    const newAppt = await addAppointment({
      date,
      start: `${formatDate(date)} ${data.start}`,
      end: `${formatDate(date)} ${data.end}`,
      service: service.name,
      employee,
    }).unwrap();
    const updatedSchedule = await updateSchedule({
      id: scheduleByDate.id,
      appointment: newAppt.data.id,
    }).unwrap();
    console.log(updatedSchedule);
  };

  return (
    <div>
      <ServiceSelect />
      <EmployeeSelect />
      <DatePicker
        date={currentDate}
        handleDateChange={handleDateChange}
        minDate={currentDate}
        maxDate={oneMonthFromCurrent}
      />
      <TimeSlots timeSlots={timeSlots} openDialog={handleOpen} />
      <CustomDialog open={open} handleClose={handleClose}>
        {selection && (
          <BookingDialog
            selection={selection}
            handleClose={handleClose}
            handleBooking={handleBooking}
          />
        )}
      </CustomDialog>
    </div>
  );
}
