import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCancelAppointmentMutation,
  useUpdateAppointmentStatusMutation,
} from '../features/appointments/apptApiSlice';
import { useSendCancellationMutation } from '../features/emailSlice';
import {
  beginRescheduling,
  endRescheduling,
  selectModifyingApptId,
  selectRescheduling,
} from '../features/appointments/appointmentSlice';
import { useNotification } from '../hooks/useNotification';
import { formatDateSlash, formatTime } from '../utils/date';

export function useAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rescheduling = useSelector(selectRescheduling);
  const modifyingApptId = useSelector(selectModifyingApptId);
  const [cancelAppointment] = useCancelAppointmentMutation();
  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const [sendCancellation] = useSendCancellationMutation();
  const { handleSuccess, handleError } = useNotification();

  const handleCancel = async (id) => {
    try {
      const cancelledAppt = await cancelAppointment({ id }).unwrap();
      if (cancelledAppt.success) handleSuccess(cancelledAppt.message);
      const formattedDate = formatDateSlash(cancelledAppt.data.date);
      const formattedTime = formatTime(cancelledAppt.data.start);
      if (!rescheduling) {
        const sentCancellation = await sendCancellation({
          employee: cancelledAppt.data.employee,
          date: formattedDate,
          time: formattedTime,
        });
        console.log('cancellation email response: ', sentCancellation);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleBeginRescheduling = (id) => {
    dispatch(beginRescheduling(id));
    navigate('/bookings');
  };

  const handleEndRescheduling = () => dispatch(endRescheduling());

  const handleStatusUpdate = async (appointment, newStatus) => {
    try {
      const statusUpdate = await updateAppointmentStatus({
        id: appointment.id,
        status: newStatus,
      }).unwrap();
      if (statusUpdate.success) handleSuccess(statusUpdate.message);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    rescheduling,
    modifyingApptId,
    handleCancel,
    handleBeginRescheduling,
    handleEndRescheduling,
    handleStatusUpdate,
  };
}
