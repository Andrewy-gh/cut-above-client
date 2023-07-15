import { useGetScheduleQuery } from '../features/scheduleSlice';

export function useScheduleQuery() {
  const { data: schedule } = useGetScheduleQuery();

  return {
    schedule,
  };
}
