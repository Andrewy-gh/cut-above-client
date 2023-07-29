import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CancelAppointment from '../components/appointments/CancelAppointment';
import ModifyAppointment from '../components/appointments/ModifyAppointment';
import { useGetSingleAppointmentQuery } from '../features/appointments/apptApiSlice';
import { useEmployeesQuery } from '../hooks/useEmployeesQuery';

const Employee = ({ employeeId }) => {
  const { employee } = useEmployeesQuery(employeeId);
  if (!employee) return <div>Loading...</div>;
  return <div>{employee.firstName}</div>;
};

export default function Appointment() {
  const { id } = useParams();
  const {
    data: appointment,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleAppointmentQuery(id);
  console.log('appointment', appointment);
  let content;
  if (isLoading) {
    console.log('loading');
    return <p>Loading...</p>;
  } else if (isSuccess) {
    console.log('success');
    content = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Typography variant="body1">{appointment.date}</Typography>
          <Typography variant="body1">{appointment.start}</Typography>
          <Typography variant="body1">{appointment.service}</Typography>
          {/* <Typography variant="body1">
            {appointment.employee.firstName}
          </Typography> */}
          <Employee employeeId={appointment.employee} />
          <ModifyAppointment appointment={appointment} />
          <CancelAppointment appointment={appointment} />
        </div>
      </div>
    );
  } else if (isError) {
    console.log('error');
    content = <p>{error}</p>;
  }
  return <>{content}</>;
}
