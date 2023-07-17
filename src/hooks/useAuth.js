import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useLogoutMutation,
} from '../features/auth/authApiSlice';
import {
  logoutUser,
  selectCurrentToken,
  selectCurrentUser,
  selectCurrentUserRole,
  setCredentials,
} from '../features/auth/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);
  const token = useSelector(selectCurrentToken);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const handleLogin = async (email, password) => {
    const loggedInUser = await login({
      email: email.toLowerCase(),
      password,
    }).unwrap();
    if (loggedInUser.success) {
      dispatch(
        setCredentials({
          user: loggedInUser.user,
          role: loggedInUser.role,
          token: loggedInUser.token,
        })
      );
      navigate('/account');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return { email, role, token, handleLogin, handleLogout };
}
