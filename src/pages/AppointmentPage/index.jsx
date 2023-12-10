import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import CancelAppointment from '@/components/appointments/CancelAppointment';
import ModifyAppointment from '@/components/appointments/ModifyAppointment';
import { useGetSingleAppointmentQuery } from '@/features/appointments/apptApiSlice';
import { useValidateTokenQuery } from '@/features/userSlice';
import Appointment from '@/components/appointments/Appointment';
import Employee from '@/components/Employee';
import styles from './styles.module.css';

// This is the single Appontment page shown when accessing through email
export default function AppointmentPage() {
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get('token');
  const {
    data: tokenStatus,
    isLoading: isTokenStatusLoading,
    isSuccess: isTokenStatusSuccess,
    isError: isTokenStatusError,
  } = useValidateTokenQuery({ option: 'email', token });
  const {
    data: appointment,
    isLoading,
    isSuccess,
    isError,
  } = useGetSingleAppointmentQuery(id, { skip: isTokenStatusError });
  let content;
  if (isLoading || isTokenStatusLoading) {
    return <p>Loading...</p>;
  } else if (
    isSuccess &&
    isTokenStatusSuccess &&
    tokenStatus.message === 'Token is valid'
  ) {
    content = (
      <>
        <h4 className="text-center">Your Upcoming Appointment</h4>
        <div className="container-lg">
          <div className={styles.appointment_card}>
            <div className={styles.flex_col}>
              <div>
                <Appointment appointment={appointment} />
                <Employee employeeId={appointment.employee} />
              </div>
            </div>
            <div className={styles.gap_4}>
              <div className={styles.grow_0}>
                <ModifyAppointment appointment={appointment} token={token} />
              </div>
              <div className={styles.grow_0}>
                <CancelAppointment appointment={appointment} token={token} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isError || isTokenStatusError) {
    content = (
      <>
        <h5 className="text-center">Oops looks like an error happened...</h5>
        <Link to="/login">
          <p className="text-center">
            Please <u>login</u> to access your appointment information.
          </p>
        </Link>
      </>
    );
  }
  return <div className="container-lg">{content}</div>;
}
