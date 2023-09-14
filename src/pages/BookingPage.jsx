import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEmployeesQuery } from '../hooks/useEmployeesQuery';
import { useScheduleQuery } from '../hooks/useScheduleQuery';
import BookingForm from '../components/bookingForm';
import BookingDialog from '../components/bookingDialog';
import { useAppointment } from '../hooks/useAppointment';
import { useBooking } from '../hooks/useBooking';
import { useFilter } from '../hooks/useFilter';
import { useDialog } from '../hooks/useDialog';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useValidateTokenQuery } from '../features/userSlice';

export default function BookingPage() {
  const navigate = useNavigate();
  const { data: employees } = useEmployeesQuery();
  const { data: schedules } = useScheduleQuery();
  const { date, employee, selection, service, handleSelectionChange } =
    useFilter();
  const { open, handleClose, handleOpen } = useDialog();
  const { handleBooking } = useBooking();
  // const { rescheduling } = useAppointment();
  const { token } = useAuth();
  const { handleError } = useNotification();

  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let emailToken = searchParams.get('token');
  console.log('====================================');
  console.log('params: ', id, emailToken);
  console.log('====================================');

  const {
    data: tokenStatus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useValidateTokenQuery(emailToken, { skip: !emailToken });
  console.log('tokenStatus: ', tokenStatus);
  console.log('isLoading', isLoading);
  console.log('isSuccess', isSuccess);
  console.log('isError', isError);
  console.log('error', error);

  const [rescheduling, setRescheduling] = useState(null);
  useEffect(() => {
    if (id) {
      setRescheduling(true);
    }
  }, [id]);

  if (emailToken && tokenStatus && tokenStatus.error) {
    handleError('Token is not valid');
  }

  const handleSelectAndOpen = (data) => {
    handleSelectionChange(data);
    handleOpen();
  };

  let message = rescheduling
    ? 'Please book your new appointment'
    : 'Schedule your appointment';

  const handleAgree = () => {
    console.log('====================================');
    console.log('emailToken is present: ', emailToken);
    console.log('====================================');
    if (!token && !emailToken) {
      handleError('Please login to complete booking');
      navigate('/login');
      return;
    }
    handleBooking({
      id,
      date,
      start: selection.start,
      end: selection.end,
      service: service.name,
      employee,
      emailToken,
    });
    handleClose();
  };

  // ! conditional: emailToken present, but validated error return error message
  return (
    <div
      style={{
        marginBottom: '4rem',
        minHeight: 'calc(100vh - 4rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '3rem' }}>{message}</h3>
      <BookingForm handleOpen={handleSelectAndOpen} />
      <BookingDialog
        open={open}
        handleClose={handleClose}
        selection={selection}
        handleAgree={handleAgree}
        token={token}
      />
    </div>
  );
}
