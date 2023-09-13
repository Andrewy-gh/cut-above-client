  import {useEffect, useState} from 'react'
  import { useParams, useSearchParams } from 'react-router-dom';
  import CancelAppointment from '../components/appointments/CancelAppointment';
  import ModifyAppointment from '../components/appointments/ModifyAppointment';
  import { useGetSingleAppointmentQuery } from '../features/appointments/apptApiSlice';
  import Appointment from '../components/appointments/Appointment';
  import Employee from '../components/Employee';

  import { useNotification, useNotification } from '../hooks/useNotification';

  export default function AppointmentPage() {
    const { id } = useParams();
    const {
      data: appointment,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetSingleAppointmentQuery(id);

    let [search, setSearchParams] = useSearchParams()
    const [isValidToken, setIsValidToken] = useState(false);
    let token = searchParams.get('token')
    const {handleError} = useNotification()

    useEffect(() => {
      async function validateEmailToken(token) {
        try {
          const res = await fetch(
            `http://localhost:3001/api/user/validate-token/${token}`
            // `https://cutaboveshop.fly.dev/api/user/validate-token/${token}`
          );
          const data = await res.json();
          if (data.message === 'Token is valid') {
            setIsValidToken(true);
          } else {
            handleError(
              'Invalid or expired token. Please request a new password reset link.'
            );
            navigate('/login');
          }
        } catch (err) {
          handleError('An error occurred.');
        }
      }
      if (token) {
        console.log('token present')
        validateEmailToken(token);
        }
    },[token])

    let content;
    if (isLoading) {
      return <p>Loading...</p>;
    } else if (isSuccess) {
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
                  <ModifyAppointment appointment={appointment} token={token}/>
                </div>
                <div style={{ flexGrow: '0' }}>
                  <CancelAppointment appointment={appointment} />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isError) {
      content = <p>{error}</p>;
    }
    return <>{content}</>;
  }
