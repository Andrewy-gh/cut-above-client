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

const fontSize = {
  fontSize: '1rem',
};

const Employee = ({ employeeId }) => {
  const { employee } = useEmployeesQuery(employeeId);
  if (!employee) return <div>Loading...</div>;
  return <div>{employee.firstName}</div>;
};

const Appointment = ({ children, appointment }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={fontSize}>{appointment.date}</div>
      <div style={fontSize}>{appointment.start}</div>
      <div style={fontSize}>{appointment.service}</div>
      {children}
    </div>
  );
};

export default function Appointments() {
  const { data } = useGetAppointmentQuery();
  const appointments = useSelector(selectAllAppointment);
  let content;
  const futureItems = [];
  const pastItems = [];
  const presentDate = new Date();
  if (appointments.length > 0) {
    appointments.forEach((appt) => {
      const apptDate = new Date(appt.date);
      if (apptDate < presentDate) {
        pastItems.push(appt);
      } else {
        futureItems.push(appt);
      }
    });
    content = (
      <>
        <h4 style={{ textAlign: 'center' }}>Upcoming appointments</h4>
        <div>
          {futureItems.map((appt) => (
            <Appointment key={appt.id} appointment={appt}>
              <Employee employeeId={appt.employee} />
              <ModifyAppointment appointment={appt} />
              <CancelAppointment appointment={appt} />
            </Appointment>
          ))}
        </div>
        {pastItems.length > 0 && (
          <h4 style={{ textAlign: 'center' }}>Past appointments</h4>
        )}
        <div>
          {pastItems.map((appt) => (
            <Appointment key={appt.id} appointment={appt}>
              <Employee employeeId={appt.employee} />
            </Appointment>
          ))}
        </div>
      </>
    );
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
