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
import { useNotification } from './useNotification';
import { formatDateSlash, formatTime } from '../utils/date';

export function useBooking() {
  const [addAppointment] = useAddAppointmentMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [sendConfirmation] = useSendConfirmationMutation();
  const [sendModification] = useSendModificationMutation();
  const scheduleByDate = useSelector(selectScheduleByDate);
  const { rescheduling, cancelId, handleCancel, handleRescheduling } =
    useAppointment();
  const { handleSuccess, handleError } = useNotification();

  const handleBooking = async ({ date, start, end, service, employee }) => {
    try {
      // const newAppt = await addAppointment({
      //   date,
      //   start,
      //   end,
      //   service,
      //   employee,
      // }).unwrap();
      // if (newAppt.success) handleSuccess(newAppt.message);
      // const updatedSchedule = await updateSchedule({
      //   id: scheduleByDate.id,
      //   appointment: newAppt.data.id,
      // }).unwrap();
      // console.log(updatedSchedule);
      // if (rescheduling && cancelId) {
      //   handleCancel(cancelId);
      //   handleRescheduling();
      //   const sentModification = await sendModification({
      //     employee,
      //     date: formatDateSlash(date),
      //     time: formatTime(start),
      //     emailId: newAppt.data.emailId,
      //   });
      //   console.log('modification response: ', sentModification);
      // } else {
      //   const sentConfirmation = await sendConfirmation({
      //     employee,
      //     date: formatDateSlash(date),
      //     time: formatTime(start),
      //     emailId: newAppt.data.emailId,
      //   });
      //   console.log('confirmation response: ', sentConfirmation);
      // }
      const newAppt = await addAppointment({
        date,
        start,
        end,
        service,
        employee,
      }).unwrap();
      if (newAppt.success) handleSuccess(newAppt.message);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    handleBooking,
  };
}
