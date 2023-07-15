import { useSelector } from 'react-redux';
import {
  selectAllAppointment,
  useGetAppointmentQuery,
  useCancelAppointmentMutation,
} from '../features/appointments/apptApiSlice';

export function useAppointment() {
  const { data } = useGetAppointmentQuery();
  const appointments = useSelector(selectAllAppointment);
  const [cancelAppointment] = useCancelAppointmentMutation();

  const handleCancel = async (id) => {
    try {
      const cancelledAppt = await cancelAppointment({ id }).unwrap();
      console.log('cancelled appointment: ', cancelledAppt);
    } catch (error) {
      console.error(error);
    }
  };

  return { appointments, handleCancel };
}
