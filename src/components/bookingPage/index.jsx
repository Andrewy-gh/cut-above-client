import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../datePickers/DatePicker';
import EmployeeSelect from './EmployeeSelect';
import ServiceSelect from './ServiceSelect';
import { setDate } from '../../features/filterSlice';

export default function BookPage() {
  const dispatch = useDispatch();
  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toISOString()));
  };
  return (
    <div>
      <ServiceSelect />
      <DatePicker handleDateChange={handleDateChange} />
      <EmployeeSelect />
    </div>
  );
}
