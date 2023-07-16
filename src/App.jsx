import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import Account from './components/auth/Account';
import AddSchedule from './components/schedule/AddSchedule';
import Appointments from './components/appointments/index';
import BookingPage from './pages/BookingPage';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/navbar/index';
import Register from './pages/Register';
import RequireAuth from './components/auth/RequireAuth';
import Schedule from './components/schedule/Schedule';
import { theme } from './styles/styles';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import ApptStatusBoard from './components/admin/ApptStatusBoard';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <div
          style={{
            minHeight: '100vh',
            minHeight: '100dvh',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
          }}
        >
          <NavBar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/account" element={<Account />} />
              <Route path="/add" element={<AddSchedule />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/dashboard/:id" element={<ApptStatusBoard />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
