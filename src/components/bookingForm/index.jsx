import DatePicker from '../datePickers/DatePicker';
import EmployeeSelect from './EmployeeSelect';
import ServiceSelect from './ServiceSelect';
import { useDateSelection } from '../../hooks/useDateSelection';
import { currentDate, formatDate, oneMonthFromCurrent } from '../../utils/date';

export default function BookingForm() {
  const { date, handleDateChange } = useDateSelection();
  return (
    <>
      <ServiceSelect />
      <EmployeeSelect />
      <DatePicker
        date={date}
        handleDateChange={handleDateChange}
        minDate={currentDate}
        maxDate={oneMonthFromCurrent}
      />
    </>
  );
}
