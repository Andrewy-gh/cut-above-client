import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './components/auth/Account';
import AddSchedule from './components/schedule/AddSchedule';
import Appointments from './components/auth/Appointments';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import RequireAuth from './components/auth/RequireAuth';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/account" element={<Account />} />
            <Route path="/add" element={<AddSchedule />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
