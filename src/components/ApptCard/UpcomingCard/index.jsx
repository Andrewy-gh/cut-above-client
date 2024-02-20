import AppTitle from '../ApptTitle';
import ModifyAppointment from '../ApptButton/ModifyAppointment';
import CancelAppointment from '../ApptButton/CancelAppointment';
import PropTypes from 'prop-types';

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
          <div>{appointment.employee.firstName}</div>
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

UpcomingCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    employee: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
    start: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
  }),
};
