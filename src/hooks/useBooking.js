import { useSelector } from 'react-redux';
import { useAddAppointmentMutation } from '../features/appointments/apptApiSlice';
import {
  selectScheduleByDate,
  useUpdateScheduleMutation,
} from '../features/scheduleSlice';
import { formatDate } from '../utils/date';

export function useBooking() {
  const [addAppointment] = useAddAppointmentMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const scheduleByDate = useSelector(selectScheduleByDate);

  const handleBooking = async ({ date, start, end, service, employee }) => {
    const newAppt = await addAppointment({
      date,
      start: `${formatDate(date)} ${start}`,
      end: `${formatDate(date)} ${end}`,
      service,
      employee,
    }).unwrap();
    const updatedSchedule = await updateSchedule({
      id: scheduleByDate.id,
      appointment: newAppt.data.id,
    }).unwrap();

    console.log(updatedSchedule);
  };

  return {
    handleBooking,
  };
}
