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

import { setUser, removeUser, getStatus } from '../utils/authStorage';
import { useEffect } from 'react';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const location = useLocation();

  const { handleSuccess, handleError } = useNotification();

  useEffect(() => {
    if (!user && getStatus()) {
      fetch('http://localhost:3001/current-user', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          console.log('data: ', data);
          dispatch(
            setCredentials({
              user: data.email,
              role: data.role,
            })
          );
        });
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
