import AppTitle from '../ApptTitle';
import Employee from '@/components/Employee';
import ModifyAppointment from '../ApptButton/ModifyAppointment';
import CancelAppointment from '../ApptButton/CancelAppointment';

export default function UpcomingCard({ appointment }) {
  return (
    <div
      className="appointment-card"
      style={{ gap: '1rem', justifyContent: 'space-between' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <AppTitle appointment={appointment} />
          <Employee employeeId={appointment.employee.id} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <div className="grow-0">
          <ModifyAppointment appointment={appointment} />
        </div>
        <div className="grow-0">
          <CancelAppointment appointment={appointment} />
        </div>
      </div>
    </div>
  );
}
