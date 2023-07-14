import { useEmployeesQuery } from '../hooks/useEmployeesQuery';
import { useScheduleQuery } from '../hooks/useScheduleQuery';
import { useEmployeeSelection } from '../hooks/useEmployeeSelection';
import { useDateSelection } from '../hooks/useDateSelection';
import { useServiceSelection } from '../hooks/useServiceSelection';
import BookingForm from '../components/bookingForm';

export default function BookingPage() {
  const { employees } = useEmployeesQuery();
  const { schedule } = useScheduleQuery();
  const { employee } = useEmployeeSelection();
  const { date, handleDateChange } = useDateSelection();
  const { service } = useServiceSelection();
  return (
    <>
      <BookingForm />
    </>
  );
}
