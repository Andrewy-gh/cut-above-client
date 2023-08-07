import UpdateApptStatus from './UpdateApptStatus';

const column = {
  border: '1px solid white',
  borderRadius: '.125rem',
  // width: '220px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
};

export default function StatusColumn({ appointments, status }) {
  const nextStatus = {
    scheduled: 'checked-in',
    'checked-in': 'completed',
    completed: 'scheduled',
  };
  const newStatus = nextStatus[status];
  if (appointments.length < 1) {
    return <h5>No {status} appointments</h5>;
  }
  return (
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
  );
}
