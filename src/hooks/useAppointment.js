import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectAllAppointment,
  useGetAppointmentQuery,
  useCancelAppointmentMutation,
  useUpdateAppointmentMutation,
} from '../features/appointments/apptApiSlice';
import {
  beginRescheduling,
  endRescheduling,
  selectCancelId,
  selectRescheduling,
} from '../features/appointments/appointmentSlice';

export function useAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAppointmentQuery();
  const appointments = useSelector(selectAllAppointment);
  const rescheduling = useSelector(selectRescheduling);
  const cancelId = useSelector(selectCancelId);
  const [cancelAppointment] = useCancelAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleCancel = async (id) => {
    try {
      const cancelledAppt = await cancelAppointment({ id }).unwrap();
      console.log('cancelled appointment: ', cancelledAppt);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModify = (id) => {
    dispatch(beginRescheduling(id));
    navigate('/bookings');
  };

  const handleRescheduling = () => dispatch(endRescheduling());

  const handleStatusUpdate = async (appointment, newStatus) => {
    const checkedInAppt = await updateAppointment({
      ...appointment,
      status: newStatus,
    });
    console.log('check status update: ', checkedInAppt);
  };

  return {
    appointments,
    rescheduling,
    cancelId,
    handleCancel,
    handleModify,
    handleRescheduling,
    handleStatusUpdate,
  };
}
