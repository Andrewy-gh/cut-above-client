import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useLoginMutation,
  useLogoutMutation,
} from '@/features/auth/authApiSlice';
import {
  logoutUser,
  selectCurrentUser,
  selectCurrentUserRole,
  setCredentials,
} from '@/features/auth/authSlice';
import { useNotification } from './useNotification';
import { cleanEmail } from '@/utils/email';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const location = useLocation();

  const { handleSuccess, handleError } = useNotification();

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await login({
        email: cleanEmail(email),
        password,
      }).unwrap();
      if (loggedInUser.success) {
        const { from } = location.state || {};
        dispatch(
          setCredentials({
            user: loggedInUser.user.email,
            role: loggedInUser.user.role,
          })
        );
        handleSuccess(loggedInUser.message);
        navigate(from || '/account');
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
    } catch (error) {
      handleError('Error logging out: ', error);
    }
  };

  return { user, role, handleLogin, handleLogout };
}
