import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScheduleQuery } from '../../hooks/useScheduleQuery';
import StatusColumn from './StatusColumn';
import StatusTab from './StatusTab';
import { formatDateFull } from '../../utils/date';

export default function ApptStatusBoard() {
  const { id } = useParams();
  const { appointments } = useScheduleQuery(id);
  const [status, setStatus] = useState('scheduled');
  const scheduled = appointments.filter((appt) => appt.status === 'scheduled');
  const checkedIn = appointments.filter((appt) => appt.status === 'checked-in');
  const completed = appointments.filter((appt) => appt.status === 'completed');
  const statuses = [
    { id: 1, name: 'scheduled', data: scheduled },
    { id: 2, name: 'checked-in', data: checkedIn },
    { id: 3, name: 'completed', data: completed },
  ];
  const filteredAppointments = statuses.find((st) => st.name === status).data;
  let content;
  if (appointments.length < 1) {
    content = <h5>No Appointments made</h5>;
  } else {
    content = (
      <>
        <h5>{formatDateFull(appointments[0].start)}</h5>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {statuses.map((status) => (
            <StatusTab
              key={statuses.id}
              handleClick={() => setStatus(status.name)}
              name={status.name}
              data={status.data}
            />
          ))}
        </div>
        <StatusColumn appointments={filteredAppointments} status={status} />
      </>
    );
  }
  return (
    <div
      style={{
        width: 'min(80ch, 100% - 2rem)',
        marginInline: 'auto',
        marginBottom: '4rem',
      }}
    >
      <Link to="/schedule">Go Back to Schedule </Link>
      {content}
    </div>
  );
}
