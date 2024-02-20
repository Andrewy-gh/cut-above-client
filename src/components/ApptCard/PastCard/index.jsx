import AppTitle from '../ApptTitle';
import PropTypes from 'prop-types';

export default function PastCard({ appointment }) {
  return (
    <div className="appointment-card" style={{ flexDirection: 'column' }}>
      <AppTitle key={appointment.id} appointment={appointment}>
        <div>{appointment.employee.firstName}</div>
      </AppTitle>
    </div>
  );
}

PastCard.propTypes = {
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
