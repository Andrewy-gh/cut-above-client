import { useParams, useSearchParams } from 'react-router-dom';
import { useGetSingleAppointmentQuery } from '@/features/appointments/apptApiSlice';
import Component from './component';
import Error from './error';

// This is the single Appontment page shown when accessing through email
export default function AppointmentPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get('token');
  const {
    data: appointment,
    isLoading,
    isSuccess,
    isError,
  } = useGetSingleAppointmentQuery(id);
  let content;
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isSuccess) {
    content = <Component appointment={appointment} emailToken={emailToken} />;
  } else if (isError) {
    throw new Error('Appointment id is not valid.');
  }
  return <div className="container-lg">{content}</div>;
}
