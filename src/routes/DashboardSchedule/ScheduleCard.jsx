import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './styles.module.css';
import { theme } from '../../styles/styles';
import PropTypes from 'prop-types';

export default function ScheduleCard({ schedule }) {
  return (
    <div
      className={styles.card}
      style={{ outline: `solid ${theme.palette.primary.dark}` }}
    >
      <div>{schedule.date}</div>
      <div>Open: {schedule.open}</div>
      <div>Close: {schedule.close}</div>
      <div>Total appointments: {schedule.appointments.length}</div>
      <Link to={`${schedule.id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  );
}

ScheduleCard.propTypes = {
  schedule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    open: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
    appointments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        client: PropTypes.shape({
          id: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
        }),
        employee: PropTypes.shape({
          id: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
        }),
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        service: PropTypes.oneOf([
          'Haircut',
          'Beard Trim',
          'Straight Razor Shave',
          'Cut and Shave Package',
          'The Full Package',
        ]).isRequired,
        status: PropTypes.string.isRequired,
      })
    ),
  }),
};
