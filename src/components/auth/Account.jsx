import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCurrentUser,
  selectCurrentToken,
} from '../../features/auth/authSlice';
import LogoutButton from '../LogoutButton';

export default function Account() {
  const email = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const welcome = email ? `Welcome ${email} to the ` : 'Welcome to the ';
  const tokenAbbr = token && `${token.slice(-9)}...`;
  const info = token
    ? `Logged in with token: ${tokenAbbr}`
    : 'No user logged in';
  return (
    <div>
      <h3>{welcome} Account page</h3>
      <p>{info}</p>
      <div>{token && <Link to="/schedule">View schedule</Link>}</div>
      <div>{token && <Link to="/add">Add a new schedule</Link>}</div>
      <div>
        {token && <Link to="/appointments">View your appointments</Link>}
      </div>
      <div>{token && <LogoutButton />}</div>
    </div>
  );
}
