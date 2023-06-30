import { useSelector } from 'react-redux';
import {
  selectAllAppointment,
  useGetAppointmentQuery,
} from '../../features/appointments/apptApiSlice';

export default function Appointments() {
  const { isLoading, isSuccess, isError, error } = useGetAppointmentQuery();
  const appointments = useSelector(selectAllAppointment);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content =
      appointments.length > 0 ? (
        appointments.map((appt) => (
          <div key={appt.id}>
            <h2>{appt.title}</h2>
            <p>{appt.date}</p>
          </div>
        ))
      ) : (
        <div>No appointments made</div>
      );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <>{content}</>;
}
