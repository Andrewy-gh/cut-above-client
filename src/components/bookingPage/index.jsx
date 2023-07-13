import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../datePickers/DatePicker';
import EmployeeSelect from '../employee/EmployeeSelect';
import ServiceSelect from './ServiceSelect';
import TimeSlots from './TimeSlots';
import { useAddAppointmentMutation } from '../../features/appointments/apptApiSlice';
import { useGetEmployeesQuery } from '../../features/employeeSlice';
import {
  selectDate,
  setDate,
  selectEmployee,
  selectService,
} from '../../features/filterSlice';
import {
  selectScheduleByDate,
  selectScheduleByFilter,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from '../../features/scheduleSlice';
import { currentDate, formatDate, oneMonthFromCurrent } from '../../utils/date';

export default function BookPage() {
  const dispatch = useDispatch();
  const { data: employees } = useGetEmployeesQuery();
  const { data: schedule } = useGetScheduleQuery();
  const employee = useSelector(selectEmployee);
  console.log('selected employee: ', employee);
  const date = useSelector(selectDate);
  const service = useSelector(selectService);
  const scheduleByDate = useSelector(selectScheduleByDate);
  const [addAppointment] = useAddAppointmentMutation();
  const [updateSchedule] = useUpdateScheduleMutation();

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toISOString()));
  };
  const timeSlots = useSelector(selectScheduleByFilter);

  const handleBooking = async (data) => {
    const newAppt = await addAppointment({
      date,
      start: `${formatDate(date)} ${data.start}`,
      end: `${formatDate(date)} ${data.end}`,
      service: service.name,
      employee,
    }).unwrap();
    const updatedSchedule = await updateSchedule({
      id: scheduleByDate.id,
      appointment: newAppt.data.id,
    }).unwrap();
    console.log(updatedSchedule);
  };

  return (
    <div>
      <ServiceSelect />
      <EmployeeSelect />
      <DatePicker
        date={currentDate}
        handleDateChange={handleDateChange}
        minDate={currentDate}
        maxDate={oneMonthFromCurrent}
      />
      <TimeSlots timeSlots={timeSlots} handleAgree={handleBooking} />
    </div>
  );
}
