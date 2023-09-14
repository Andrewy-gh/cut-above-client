import { useParams, useSearchParams } from 'react-router-dom';
import CancelAppointment from '../components/appointments/CancelAppointment';
import ModifyAppointment from '../components/appointments/ModifyAppointment';
import { useGetSingleAppointmentQuery } from '../features/appointments/apptApiSlice';
import { useValidateTokenQuery } from '../features/userSlice';
import Appointment from '../components/appointments/Appointment';
import Employee from '../components/Employee';

export default function AppointmentPage() {
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get('token');
  console.log('====================================');
  console.log('params: ', id, token);
  console.log('====================================');
  const {
    data: tokenStatus,
    isLoading: isTokenStatusLoading,
    isSuccess: isTokenStatusSuccess,
    isError: isTokenStatusError,
    error: tokenStatusError,
  } = useValidateTokenQuery(token);
  console.log('====================================');
  console.log('tokenStatus: ', tokenStatus);
  console.log('====================================');

  const {
    data: appointment,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleAppointmentQuery(id);
  console.log('====================================');
  console.log('appointment: ', appointment);
  console.log('====================================');

  // useEffect(() => {
  //   async function validateEmailToken(token) {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:3001/api/user/validate-token/${token}`
  //         // `https://cutaboveshop.fly.dev/api/user/validate-token/${token}`
  //       );
  //       const data = await res.json();
  //       if (data.message === 'Token is valid') {
  //         setIsValidToken(true);
  //       } else {
  //         handleError(
  //           'Invalid or expired token. Please request a new password reset link.'
  //         );
  //         navigate('/login');
  //       }
  //     } catch (err) {
  //       handleError('An error occurred.');
  //     }
  //   }
  //   if (token) {
  //     console.log('token present');
  //     validateEmailToken(token);
  //   }
  // }, [token]);

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
        <h4 style={{ textAlign: 'center' }}>Your Upcoming Appointment</h4>
        <div style={{ width: 'min(80ch, 100% - 2rem)', marginInline: 'auto' }}>
          <div
            className="appointment-card"
            style={{ gap: '1rem', justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <Appointment appointment={appointment} />
                <Employee employeeId={appointment.employee} />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div style={{ flexGrow: '0' }}>
                <ModifyAppointment appointment={appointment} token={token} />
              </div>
              <div style={{ flexGrow: '0' }}>
                <CancelAppointment appointment={appointment} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isError || isTokenStatusError) {
    content = <p>{error || tokenStatusError}</p>;
  }
  return <>{content}</>;
}
