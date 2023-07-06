import { useSelector } from 'react-redux';
import {
  selectAllSchedule,
  useGetScheduleQuery,
} from '../../features/scheduleSlice';
export default function Schedules() {
  const { isLoading, isSuccess, isError, error } = useGetScheduleQuery();
  const schedule = useSelector(selectAllSchedule);
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = schedule.map((sc) => (
      <div key={sc.id} style={{ marginBottom: '2rem' }}>
        <h5>
          Date:
          {new Date(sc.date).toLocaleString('en-US', {
            timeZone: 'America/New_York',
          })}
        </h5>
        <div>
          Open:{' '}
          {new Date(sc.open).toLocaleString('en-US', {
            timeZone: 'America/New_York',
          })}
        </div>
        <div>
          Close:{' '}
          {new Date(sc.close).toLocaleString('en-US', {
            timeZone: 'America/New_York',
          })}
        </div>
      </div>
    ));
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h5>Schedule</h5>
      <ul>{content}</ul>
    </div>
  );
}
