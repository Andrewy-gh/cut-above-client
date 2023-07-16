import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useScheduleQuery } from '../../hooks/useScheduleQuery';
import { formatDateFull, formatDateToTime } from '../../utils/date';
export default function Schedules() {
  // const { isLoading, isSuccess, isError, error } = useGetScheduleQuery();
  // const schedule = useSelector(selectAllSchedule);
  // let content;
  // if (isLoading) {
  //   content = <div>Loading...</div>;
  // } else if (isSuccess) {
  //   content = schedule.map((sc) => (
  //     <div key={sc.id} style={{ marginBottom: '2rem' }}>
  //       <h5>
  //         Date:
  //         {new Date(sc.date).toLocaleString('en-US', {
  //           timeZone: 'America/New_York',
  //         })}
  //       </h5>
  //       <div>
  //         Open:{' '}
  //         {new Date(sc.open).toLocaleString('en-US', {
  //           timeZone: 'America/New_York',
  //         })}
  //       </div>
  //       <div>
  //         Close:{' '}
  //         {new Date(sc.close).toLocaleString('en-US', {
  //           timeZone: 'America/New_York',
  //         })}
  //       </div>
  //     </div>
  //   ));
  // } else if (isError) {
  //   content = <div>{error}</div>;
  // }
  // console.log(schedule);
  const { schedules } = useScheduleQuery();
  let content;
  if (!schedules) {
    content = <div>Loading...</div>;
  } else {
    content = schedules.map((sc) => (
      <div key={sc.id} style={{ marginBottom: '1rem`' }}>
        <div>{formatDateFull(sc.date)}</div>
        <div>Open: {formatDateToTime(sc.open)}</div>
        <div>Close: {formatDateToTime(sc.close)}</div>
        <div>Total appointments: {sc.appointments.length}</div>
        <Link to={`/dashboard/${sc.id}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    ));
  }
  return (
    <div>
      <h5>Schedule</h5>
      <div>{content}</div>
    </div>
  );
}
