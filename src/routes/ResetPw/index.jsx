import { useParams } from 'react-router-dom';
import Component from './component';
import Error from './error';

// This is the Reset Password page when accessed through email
export default function ResetPw() {
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
