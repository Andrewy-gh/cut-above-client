import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
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
          <Typography variant="h6" component="div">
            Scheduled
          </Typography>
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
          <Typography variant="h6" component="div">
            Checked In
          </Typography>
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
          <Typography variant="h6" component="div">
            Completed
          </Typography>
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
  if (appointments.length < 1) return <div>No Appointments made</div>;
  return (
    <div>
      <Link to="/schedule">Go Back to Schedule </Link>
      <Typography variant="h5" component="div" style={{ padding: '1rem' }}>
        {formatDateFull(appointments[0].date)}
      </Typography>
      <StatusColumns appointments={appointments} />
    </div>
  );
}
