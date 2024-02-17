import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useValidateTokenQuery } from '@/features/userSlice';

export default function TokenValidation() {
  const { token, email } = useParams();
  if (!email) {
    throw new Error('no email');
  }
  if (!token) {
    throw new Error('no token');
  }
  const {
    data: tokenStatus,
    isLoading,
    isSuccess,
    isError,
  } = useValidateTokenQuery({ email, token });
  console.log('tokenStatus', tokenStatus, isSuccess);
  console.log('error', isError);
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isSuccess && tokenStatus.message === 'Token is valid') {
    return <Outlet />;
  } else if (isError) {
    throw new Error('Token is not valid');
  }
}
