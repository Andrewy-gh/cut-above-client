import { Link, useParams } from 'react-router-dom';
import { useScheduleQuery } from '../../hooks/useScheduleQuery';
import UpdateApptStatus from './UpdateApptStatus';
import { formatDateFull } from '../../utils/date';

const column = {
  margin: '.5rem',
  border: '1px solid white',
  borderRadius: '.125rem',
  // width: '220px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
};

const StatusColumns = ({ appointments }) => {
  const scheduled = appointments.filter((appt) => appt.status === 'scheduled');
  const checkedIn = appointments.filter((appt) => appt.status === 'checked-in');
  const completed = appointments.filter((appt) => appt.status === 'completed');

  return (
    <div style={{ marginInline: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        }}
      >
        <div style={column}>
          <h2>Scheduled</h2>
          {scheduled.map((e) => (
            <div key={e.id}>
              <div>Client: {e.client}</div>
              <div>Employee: {e.employee}</div>
              <div>Start: {e.start}</div>
              <div>Service: {e.service}</div>
              <UpdateApptStatus appointment={e} newStatus={'checked-in'} />
            </div>
          ))}
        </div>
        <div style={column}>
          <h2>Checked In</h2>
          {checkedIn.map((e) => (
            <div key={e.id}>
              <div>Client: {e.client}</div>
              <div>Employee: {e.employee}</div>
              <div>Start: {e.start}</div>
              <div>Service: {e.service}</div>
              <UpdateApptStatus appointment={e} newStatus={'completed'} />
            </div>
          ))}
        </div>
        <div style={column}>
          <h2>Completed</h2>
          {completed.map((e) => (
            <div key={e.id}>
              <div>Client: {e.client}</div>
              <div>Employee: {e.employee}</div>
              <div>Start: {e.start}</div>
              <div>Service: {e.service}</div>
              <UpdateApptStatus appointment={e} newStatus={'scheduled'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ApptStatusBoard() {
  const { id } = useParams();
  const { appointments } = useScheduleQuery(id);
  let content;
  if (appointments.length < 1) {
    content = <div>No Appointments made</div>;
  } else {
    content = (
      <>
        <h2 style={{ padding: '1rem' }}>
          {formatDateFull(appointments[0].date)}
        </h2>
        <StatusColumns appointments={appointments} />
      </>
    );
  }
  return (
    <div style={{ marginBottom: '4rem' }}>
      <Link to="/schedule">Go Back to Schedule </Link>
      {content}
    </div>
  );
}
