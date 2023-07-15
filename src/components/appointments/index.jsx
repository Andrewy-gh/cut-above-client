import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CancelAppointment from './CancelAppointment';
import { useAppointment } from '../../hooks/useAppointment';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';

const Employee = ({ employeeId }) => {
  const { employee } = useEmployeesQuery(employeeId);
  if (!employee) return <div>Loading...</div>;
  return <div>{employee.firstName}</div>;
};

export default function Appointments() {
  const { appointments } = useAppointment();

  let content;
  if (appointments.length > 0) {
    content = appointments.map((appt) => (
      <div
        key={appt.id}
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
          <Typography variant="body1">{appt.date}</Typography>
          <Typography variant="body1">{appt.start}</Typography>
          <Typography variant="body1">{appt.service}</Typography>
          <Employee employeeId={appt.employee} />
          <CancelAppointment appt={appt} />
        </div>
      </div>
    ));
  } else {
    content = (
      <Typography component="h4" variant="h5" align="center">
        No appointments made
      </Typography>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Link to="/account">Go back to account page</Link>
      </div>
      <div>{content}</div>
    </div>
  );
}
