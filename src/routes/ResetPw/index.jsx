import { useParams } from 'react-router-dom';
import { useValidateTokenQuery } from '@/features/userSlice';
import Component from './component';
import Error from './error';

// This is the Reset Password page when accessed through email
export default function ResetPw() {
  // let [searchParams, setSearchParams] = useSearchParams();

  // let emailToken = searchParams.get('token');

  // const {
  //   data: tokenStatus,
  //   isLoading,
  //   isSuccess,
  //   isError,
  // } = useValidateTokenQuery({ option: 'reset', token: emailToken });

  // let content;
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // } else if (isSuccess && tokenStatus.message === 'Token is valid') {
  //   content = <Component emailToken={emailToken} />;
  // } else if (isError) {
  //   content = <Error />;
  // }
  // return <div className="container-sm">{content}</div>;
  const { token, id } = useParams();
  if (!id) {
    throw new Error('no id');
  }
  if (!token) {
    throw new Error('no token');
  }
  return (
    <div className="container-sm">
      <Component id={id} token={token} />
    </div>
  );
}
