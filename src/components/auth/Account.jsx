import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteAccount from './DeleteAccount';
import LogoutButton from '../LogoutButton';
import {
  selectCurrentUser,
  selectCurrentToken,
} from '../../features/auth/authSlice';
import { useUsersQuery } from '../../hooks/useUsersQuery';

export default function Account() {
  const navigate = useNavigate();
  const email = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const { handleUserDelete } = useUsersQuery();
  const welcome = email ? `Welcome ${email} to the ` : 'Welcome to the ';
  const tokenAbbr = token && `${token.slice(-9)}...`;
  const info = token
    ? `Logged in with token: ${tokenAbbr}`
    : 'No user logged in';

  if (!token) {
    navigate('/login');
  }

  return (
    <div>
      <h3>{welcome} Account page</h3>
      <p>{info}</p>
      <div>
        <Link to="/schedule">View schedule</Link>
      </div>
      <div>
        <Link to="/add">Add a new schedule</Link>
      </div>
      <div>
        <Link to="/appointments">View your appointments</Link>
      </div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <DeleteAccount />
      </div>
    </div>
  );
}
