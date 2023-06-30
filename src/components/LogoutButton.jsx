import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}
