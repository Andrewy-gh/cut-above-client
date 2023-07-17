import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentToken,
  selectCurrentUserRole,
} from '../../features/auth/authSlice';

export default function RequireAuth({ requiredRole }) {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentUserRole);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
