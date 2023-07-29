import { useSelector } from 'react-redux';
import { useAddAppointmentMutation } from '../features/appointments/apptApiSlice';
import {
  useSendConfirmationMutation,
  useSendModificationMutation,
} from '../features/emailSlice';
import {
  selectScheduleByDate,
  useUpdateScheduleMutation,
} from '../features/scheduleSlice';
import { useAppointment } from './useAppointment';
import { formatDateSlash, formatTimeAlt } from '../utils/date';

export function useBooking() {
  const [addAppointment] = useAddAppointmentMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [sendConfirmation] = useSendConfirmationMutation();
  const [sendModification] = useSendModificationMutation();
  const scheduleByDate = useSelector(selectScheduleByDate);
  const { rescheduling, cancelId, handleCancel, handleRescheduling } =
    useAppointment();

  const handleBooking = async ({ date, start, end, service, employee }) => {
    const newAppt = await addAppointment({
      date,
      start,
      end,
      service,
      employee,
    }).unwrap();
    const updatedSchedule = await updateSchedule({
      id: scheduleByDate.id,
      appointment: newAppt.data.id,
    }).unwrap();
    console.log(updatedSchedule);
    if (rescheduling && cancelId) {
      handleCancel(cancelId);
      handleRescheduling();
      const sentModification = await sendModification({
        employee,
        date: formatDateSlash(date),
        time: formatTimeAlt(start),
      });
      console.log('modification response: ', sentModification);
    } else {
      const sentConfirmation = await sendConfirmation({
        employee,
        date: formatDateSlash(date),
        time: formatTimeAlt(start),
      });
      console.log('confirmation response: ', sentConfirmation);
    }
  };

  return {
    handleBooking,
  };
}
