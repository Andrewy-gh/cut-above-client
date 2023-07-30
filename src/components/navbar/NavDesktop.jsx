import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { theme } from '../../styles/styles';
import { selectCurrentToken } from '../../features/auth/authSlice';

export default function NavDesktop() {
  const token = useSelector(selectCurrentToken);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/bookings">
        <Button variant="contained">Book now</Button>
      </Link>
      <Link to="/">
        <div
          style={{
            fontFamily: 'Corben',
            fontSize: '1.3125rem',
            fontWeight: 700,
          }}
        >
          Cut Above
        </div>
      </Link>
      {token ? (
        <Link to="/account">
          <IconButton
            edge="start"
            sx={{ mr: 1, color: theme.palette.secondary.dark }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Link>
      ) : (
        <div>
          <Link to="/signup">
            <Button sx={{ color: theme.palette.secondary.dark }}>Signup</Button>
          </Link>
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
