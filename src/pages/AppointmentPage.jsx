import { useParams } from 'react-router-dom';
import CancelAppointment from '../components/appointments/CancelAppointment';
import ModifyAppointment from '../components/appointments/ModifyAppointment';
import { useGetSingleAppointmentQuery } from '../features/appointments/apptApiSlice';
import Appointment from '../components/appointments/Appointment';
import Employee from '../components/Employee';

export default function AppointmentPage() {
  const { id } = useParams();
  const {
    data: appointment,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleAppointmentQuery(id);
  let content;
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <h4 style={{ textAlign: 'center' }}>Your Upcoming Appointment</h4>
        <div style={{ width: 'min(80ch, 100% - 2rem)', marginInline: 'auto' }}>
          <div
            className="appointment-card"
            style={{ gap: '1rem', justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <Appointment appointment={appointment} />
                <Employee employeeId={appointment.employee} />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ flexGrow: '0' }}>
                <ModifyAppointment appointment={appointment} />
              </div>
              <div style={{ flexGrow: '0' }}>
                <CancelAppointment appointment={appointment} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <>{content}</>;
}
