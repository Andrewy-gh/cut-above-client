import AppTitle from '../ApptTitle';

export default function PastCard({ appointment }) {
  return (
    <div className="appointment-card" style={{ flexDirection: 'column' }}>
      <AppTitle key={appointment.id} appointment={appointment} />
      <div>{appointment.employee.firstName}</div>
    </div>
  );
}
