import { Link } from 'react-router-dom';
import { useGetDashboardSchedulesQuery } from '@/features/scheduleSlice';
import ScheduleCard from './ScheduleCard';
import styles from './styles.module.css';
import { splitByUpcomingAndPast } from '@/utils/date';

// This is an admin page which list all upcoming and past schedules
export default function DashboardSchedule() {
  const {
    data: schedules,
    isLoading,
    isSuccess,
    isError,
  } = useGetDashboardSchedulesQuery();

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    const [upcomingSchedules, pastSchedules] =
      splitByUpcomingAndPast(schedules);
    content = (
      <>
        <h5 className={styles.header}>Upcoming schedules</h5>
        <div className={styles.container}>
          {upcomingSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
        <h5 className={styles.header}>Past schedules</h5>
        <div className={styles.container}>
          {pastSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </>
    );
  } else if (isError) {
    throw new Error('Error fetching schedules');
  }
  return (
    <div className="container-lg mb-16">
      <div className="mt-4">
        <Link to="/account">Back to account page</Link>
      </div>
      <h4 className={styles.header}>
        {schedules.length < 1 ? 'No Schedules available' : 'All Schedules'}
      </h4>
      <div>{content}</div>
    </div>
  );
}
