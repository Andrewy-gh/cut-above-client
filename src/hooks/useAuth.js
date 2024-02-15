import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} from '@/features/auth/authApiSlice';
import {
  logoutUser,
  selectCurrentUser,
  selectCurrentUserRole,
  setCredentials,
} from '@/features/auth/authSlice';
import { useNotification } from './useNotification';
import { cleanEmail } from '@/utils/email';

import { setUser, removeUser, getStatus } from '../utils/authStorage';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const location = useLocation();

  const { handleSuccess, handleError } = useNotification();
  const { data: currentUser, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!user && getStatus() && isSuccess) {
      dispatch(
        setCredentials({
          user: currentUser.email,
          role: currentUser.role,
        })
      );
    }
  }, []);

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
        setUser();
        navigate(from || '/account');
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      removeUser();
      dispatch(logoutUser());
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return { user, role, handleLogin, handleLogout };
}
