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
import { selectEmployee } from '../../features/filterSlice';
import BookingDialog from './BookingDialog';
import Employee from '../employee';

// TODO: debugging:
import { selectService } from '../../features/filterSlice';

export default function BookPage() {
  const dispatch = useDispatch();
  const { data: employees } = useGetEmployeesQuery();
  const { data: schedule } = useGetScheduleQuery();
  const employee = useSelector(selectEmployee);

  // TODO: debugging values:
  const date = useSelector(selectDate);
  const service = useSelector(selectService);

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

  const handleBooking = (data) => {
    console.log('handling this booking');
    // TODO: new appointment
    // POST: date, start, end, service, client, employee
    console.log('selected date:', date);
    console.log('data from time slot:');
    console.table(data);
    console.log('selected service: ', service);
    console.log('selected employee to book: ', employee);
    // TODO: add to schedule
    // PUT: new appointment
  };

  return (
    <div>
      <div>DEBUG service: {JSON.stringify(service)}</div>
      <ServiceSelect />
      <DatePicker handleDateChange={handleDateChange} />
      <TimeSlots timeSlots={timeSlots} handleAgree={handleBooking} />
    </div>
  );
}
