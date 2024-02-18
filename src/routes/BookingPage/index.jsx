import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEmployeesQuery } from '@/hooks/useEmployeesQuery';
import { useScheduleQuery } from '@/hooks/useScheduleQuery';
import BookingForm from '@/routes/BookingPage/BookingForm';
import BookingDialog from '@/routes/BookingPage/BookingDialog';
import { useBooking } from '@/hooks/useBooking';
import { useFilter } from '@/hooks/useFilter';
import { useDialog } from '@/hooks/useDialog';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useValidateTokenQuery } from '@/features/auth/authApiSlice';
import Error from './error';
import styles from './styles.module.css';

export default function BookingPage() {
  const navigate = useNavigate();
  useEmployeesQuery();
  useScheduleQuery();
  const { date, employee, selection, service, handleSelectionChange } =
    useFilter();
  const { open, handleClose, handleOpen } = useDialog();
  const { handleBooking } = useBooking();
  const { user } = useAuth();
  const { handleError } = useNotification();
  // handles modifying an appointment
  const [rescheduling, setRescheduling] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setRescheduling(true);
    }
  }, [id]);
  let message = rescheduling
    ? 'Please book your new appointment'
    : 'Schedule your appointment';

  // handles modifying an appointment through email
  let [searchParams] = useSearchParams();
  let emailToken = searchParams.get('token');
  const {
    data: tokenStatus,
    isLoading,
    isError,
  } = useValidateTokenQuery(
    { option: 'email', token: emailToken },
    { skip: !emailToken }
  );
  if (emailToken && tokenStatus && tokenStatus.error) {
    handleError('Token is not valid');
  }

  const handleSelectAndOpen = (data) => {
    handleSelectionChange(data);
    handleOpen();
  };

  const handleAgree = () => {
    if (!user && !emailToken) {
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
      // emailToken,
    });
    handleClose();
  };
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (emailToken && isError) {
    // emailToken present but it is not valid
    content = <Error />;
  } else {
    content = (
      <div className={styles.flex_container}>
        <h3 className={styles.header}>{message}</h3>
        <BookingForm handleOpen={handleSelectAndOpen} employee={employee} />
        <BookingDialog
          open={open}
          handleClose={handleClose}
          selection={selection}
          handleAgree={handleAgree}
          user={user}
        />
      </div>
    );
  }
  return <>{content}</>;
}
