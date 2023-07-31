import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { useAuth } from '../../hooks/useAuth';

export default function Account() {
  const navigate = useNavigate();
  const { email, role, token } = useAuth();
  const welcome = email ? `Welcome ${email} to the ` : 'Welcome to the ';
  const tokenAbbr = token && `${token.slice(-9)}...`;
  const info = token
    ? `Logged in with token: ${tokenAbbr}`
    : 'No user logged in';

  if (!token) {
    navigate('/login');
  }
  console.log('email: ', email);

  return (
    <div>
      <h3>{welcome} Account page</h3>
      <p>Current user privileges: {role}</p>
      <p>{info}</p>
      <div>
        <Link to="/account/settings">Account settings</Link>
      </div>
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
    </div>
  );
}
