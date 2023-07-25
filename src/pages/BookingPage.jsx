import Typography from '@mui/material/Typography';
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

const url =
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80';

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: `url(${url}) center/cover no-repeat`,
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.50) 100%)',
};

const contentStyle = {
  marginInline: 'auto',
  paddingBlock: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  mb: '1.5rem',
  position: 'relative',
  zIndex: 2,
};

export default function BookingPage() {
  const { employees } = useEmployeesQuery();
  const { schedules } = useScheduleQuery();
  const { date } = useDateSelection();
  const { service } = useServiceSelection();
  const { employee } = useEmployeeSelection();
  const { open, selection, handleSelectAndOpen, handleClose } = useDialog();
  const { handleBooking } = useBooking();
  const { rescheduling } = useAppointment();
  let message;
  if (rescheduling) message = <div>Please book your new appointment</div>;

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        {message}
        <Typography
          component="h3"
          variant="h4"
          gutterBottom
          align="center"
          sx={{ mb: 5 }}
        >
          Schedule your appointment
        </Typography>
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
      </div>
    </div>
  );
}
