import { useEmployeesQuery } from '../hooks/useEmployeesQuery';
import { useScheduleQuery } from '../hooks/useScheduleQuery';
import BookingForm from '../components/bookingForm';
import BookingDialog from '../components/bookingDialog';
import { useAppointment } from '../hooks/useAppointment';
import { useBooking } from '../hooks/useBooking';
import { useFilter } from '../hooks/useFilter';
import { useDialog } from '../hooks/useDialog';

export default function BookingPage() {
  const { employees } = useEmployeesQuery();
  const { schedules } = useScheduleQuery();
  const { date, employee, selection, service, handleSelectionChange } =
    useFilter();
  const { open, handleClose, handleOpen } = useDialog();
  const { handleBooking } = useBooking();
  const { rescheduling } = useAppointment();

  const handleSelectAndOpen = (data) => {
    handleSelectionChange(data);
    handleOpen();
  };

  let message = rescheduling
    ? 'Please book your new appointment'
    : 'Schedule your appointment';

  const handleAgree = () => {
    handleBooking({
      date,
      start: selection.start,
      end: selection.end,
      service: service.name,
      employee,
    });
    handleClose();
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '3rem' }}>{message}</h3>
      <BookingForm handleOpen={handleSelectAndOpen} />
      <BookingDialog
        open={open}
        handleClose={handleClose}
        selection={selection}
        handleAgree={handleAgree}
      />
    </div>
  );
}
