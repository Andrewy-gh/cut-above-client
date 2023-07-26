import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { theme } from './styles/styles';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import Layout from './components/Layout';
if (process.env.NODE_ENV === 'production') disableReactDevTools();

// Lazy-loaded components
const Account = React.lazy(() => import('./components/auth/Account'));
const AddSchedule = React.lazy(() =>
  import('./components/schedule/AddSchedule')
);
const Appointments = React.lazy(() =>
  import('./components/appointments/index')
);
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const RequireAuth = React.lazy(() => import('./components/auth/RequireAuth'));
const Schedule = React.lazy(() => import('./components/schedule/Schedule'));
const Unauthorized = React.lazy(() => import('./components/auth/Unauthorized'));
const ApptStatusBoard = React.lazy(() =>
  import('./components/admin/ApptStatusBoard')
);

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/account" element={<Account />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route element={<RequireAuth requiredRole="admin" />}>
                <Route path="/add" element={<AddSchedule />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/dashboard/:id" element={<ApptStatusBoard />} />
              </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
