import { useEmployeesQuery } from '../hooks/useEmployeesQuery';
import { useScheduleQuery } from '../hooks/useScheduleQuery';
import BookingForm from '../components/bookingForm';
import BookingDialog from '../components/bookingDialog';
import { useAppointment } from '../hooks/useAppointment';
import { useBooking } from '../hooks/useBooking';
import { useDateSelection } from '../hooks/useDateSelection';
import { useDialog } from '../hooks/useDialog';
import { useServiceSelection } from '../hooks/useServiceSelection';
import { useEmployeeSelection } from '../hooks/useEmployeeSelection';

export default function BookingPage() {
  const { employees } = useEmployeesQuery();
  const { schedule } = useScheduleQuery();
  const { date } = useDateSelection();
  const { service } = useServiceSelection();
  const { employee } = useEmployeeSelection();
  const { open, selection, handleSelectAndOpen, handleClose } = useDialog();
  const { handleBooking } = useBooking();
  const { rescheduling } = useAppointment();
  let message;
  if (rescheduling) message = <div>Please book your new appointment</div>;

  return (
    <>
      {message}
      <BookingForm handleOpen={handleSelectAndOpen} />
      <BookingDialog
        open={open}
        handleClose={handleClose}
        selection={selection}
        handleAgree={() =>
          handleBooking({
            date,
            start: selection.start,
            end: selection.end,
            service: service.name,
            employee,
          })
        }
      />
    </>
  );
}
