import { Link } from 'react-router-dom';
import CancelAppointment from './CancelAppointment';
import ModifyAppointment from './ModifyAppointment';
// import { useAppointment } from '../../hooks/useAppointment';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';
import {
  selectAllAppointment,
  useGetAppointmentQuery,
} from '../../features/appointments/apptApiSlice';
import { useSelector } from 'react-redux';

const Employee = ({ employeeId }) => {
  const { employee } = useEmployeesQuery(employeeId);
  if (!employee) return <div>Loading...</div>;
  return <div>{employee.firstName}</div>;
};

const fontSize = {
  fontSize: '1rem',
};

export default function Appointments() {
  // const { appointments } = useAppointment();
  const { data } = useGetAppointmentQuery();
  // console.log('appoinement data: ', appointments);
  const appointments = useSelector(selectAllAppointment);
  console.log('appointments', appointments);

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
          <div style={fontSize}>{appt.date}</div>
          <div style={fontSize}>{appt.start}</div>
          <div style={fontSize}>{appt.service}</div>
          <Employee employeeId={appt.employee} />
          <ModifyAppointment appointment={appt} />
          <CancelAppointment appointment={appt} />
        </div>
      </div>
    ));
  } else {
    content = <h4 style={{ textAlign: 'center' }}>No appointments made</h4>;
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
