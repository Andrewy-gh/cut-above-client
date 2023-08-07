import { useState } from 'react';
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

const StatusColumns = ({ appointments, status }) => {
  const nextStatus = {
    scheduled: 'checked-in',
    'checked-in': 'completed',
    completed: 'scheduled',
  };
  const newStatus = nextStatus[status];
  if (appointments.length < 1) {
    return <div>No {status} appointments</div>;
  }
  return (
    <div style={{ marginInline: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        }}
      >
        <div style={column}>
          {appointments.map((appt) => (
            <div key={appt.id}>
              <div>Client: {appt.client}</div>
              <div>Employee: {appt.employee}</div>
              <div>Start: {appt.start}</div>
              <div>Service: {appt.service}</div>
              <UpdateApptStatus appointment={appt} newStatus={newStatus} />
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
  const [status, setStatus] = useState('scheduled');
  let content;
  const filteredAppointments = status
    ? appointments.filter((appt) => appt.status === status)
    : appointments;
  const scheduled = appointments.filter((appt) => appt.status === 'scheduled');
  const checkedIn = appointments.filter((appt) => appt.status === 'checked-in');
  const completed = appointments.filter((appt) => appt.status === 'completed');
  if (appointments.length < 1) {
    content = <div>No Appointments made</div>;
  } else {
    content = (
      <>
        <h5 style={{ padding: '1rem' }}>
          {formatDateFull(appointments[0].start)}
        </h5>
        <div style={{ display: 'flex', gap: '1rem', outline: 'solid white' }}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => setStatus('scheduled')}
          >
            Scheduled {scheduled.length}
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => setStatus('checked-in')}
          >
            Checked In {checkedIn.length}
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => setStatus('completed')}
          >
            Completed {completed.length}
          </div>
        </div>
        <StatusColumns appointments={filteredAppointments} status={status} />
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
