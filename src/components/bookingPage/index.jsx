import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../datePickers/DatePicker';
import EmployeeSelect from '../employee/EmployeeSelect';
import ServiceSelect from './ServiceSelect';
import TimeSlots from './TimeSlots';
import { selectDate, setDate } from '../../features/filterSlice';
import {
  selectAllSchedule,
  selectScheduleByDate,
  selectScheduleByFilter,
  useGetScheduleQuery,
} from '../../features/scheduleSlice';
import { findAvailableTimeSlots, formatDate } from '../../utils/date';
import { useGetEmployeesQuery } from '../../features/employeeSlice';

// const employees = [
//   { id: 1, firstName: 'Andre' },
//   { id: 2, firstName: 'Obi' },
//   { id: 3, firstName: 'Salah' },
// ];

// const scheduleObj = [
//   {
//     date: '2023-07-06T04:00:00Z',
//     open: '2023-07-06T14:00:00Z',
//     close: '2023-07-06T23:00:00Z',
//     appointments: [],
//   },
//   {
//     date: '2023-07-07T04:00:00Z',
//     open: '2023-07-07T14:00:00Z',
//     close: '2023-07-07T15:00:00Z',
//     appointments: [],
//   },
// ];

export default function BookPage() {
  const dispatch = useDispatch();
  const { data: employees } = useGetEmployeesQuery();
  const { data: schedule } = useGetScheduleQuery();
  // const scheduleByDate = useSelector(selectScheduleByDate);
  // const selectedDate = useSelector(selectDate);
  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toISOString()));
  };
  const timeSlots = useSelector(selectScheduleByFilter);
  console.log('timeSlots', timeSlots);

  // const scheduleByDate = scheduleObj.find(
  //   (s) => formatDate(s.date) === formatDate(selectedDate)
  // );
  // // console.log("selectedDate", selectedDate);
  // // console.log("scheduleByDate", scheduleByDate);
  // const employeeIds = employees.map((e) => e.id);
  // const availableTimeSlots = findAvailableTimeSlots(
  //   scheduleByDate,
  //   30, // service duration
  //   employeeIds
  // );
  // available: Array(3) [ 1, 2, 3 ]
  // ​​end: "10:30"
  // ​​id: "6c908e06-9cea-4d76-94bd-2a97d16e3935"
  // ​​start: "10:00"
  // console.log('availableTimeSlots', availableTimeSlots);

  const handleBooking = () => {
    console.log('handling this booking');
  };

  return (
    <div>
      <ServiceSelect />
      <DatePicker handleDateChange={handleDateChange} />
      <TimeSlots timeSlots={timeSlots} handleAgree={handleBooking} />
    </div>
  );
}
