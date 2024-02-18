import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/routes/Layout';
import Home from '@/routes/Home';
import BookingPage from '@/routes/BookingPage';
import Login from '@/routes/Login';
import Register from '@/routes/Register';
import ErrorPage from '@/routes/ErrorPage';
// import ResetPw from '@/routes/ResetPw';
import ResetPwError from '@/routes/ResetPw/error';
// import RequireAuth from '@/routes/RequireAuth';
// import Account from '@/routes/Account';
// import Settings from '@/routes/Settings';
// import Appointments from '@/routes/Appointments';
// import AppointmentPage from '@/routes/AppointmentPage';
import AppointmentError from '@/routes/AppointmentPage/error';
// import AddSchedule from '@/routes/AddSchedule';
// import DashboardSchedule from '@/routes/DashboardSchedule';
// import DashboardAppointment from '@/routes/DashboardAppointment';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';
// import Unauthorized from '@/routes/RequireAuth/Unauthorized';
import TokenValidation from './routes/TokenVaidation';
if (process.env.NODE_ENV === 'production') disableReactDevTools();

// // Lazy-loaded components
const Account = lazy(() => import('./routes/Account'));
const AppointmentPage = lazy(() => import('./routes/AppointmentPage'));
const ResetPw = lazy(() => import('./routes/ResetPw'));
const AddSchedule = lazy(() => import('./routes/AddSchedule'));
const Appointments = lazy(() => import('./routes/appointments'));
const RequireAuth = lazy(() => import('./routes/RequireAuth'));
const DashboardSchedule = lazy(() => import('./routes/DashboardSchedule'));
const Settings = lazy(() => import('./routes/Settings'));
const Unauthorized = lazy(() => import('.//routes/RequireAuth/Unauthorized'));
const DashboardAppointment = lazy(() =>
  import('./routes/DashboardAppointment')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'bookings/:id?', element: <BookingPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'appointment/:id',
            element: <AppointmentPage />,
            errorElement: <AppointmentError />,
          },
          {
            path: 'account',
            children: [
              { index: true, element: <Account /> },
              { path: 'settings', element: <Settings /> },
              { path: 'appointments', element: <Appointments /> },
            ],
          },
        ],
      },
      {
        element: <RequireAuth requiredRole="admin" />,
        errorElement: <Unauthorized />,
        children: [
          { path: 'addschedule', element: <AddSchedule /> },
          {
            path: 'dashboard',
            element: <DashboardSchedule />,
          },
          {
            path: 'dashboard/:id',
            element: <DashboardAppointment />,
          },
        ],
      },
      {
        element: <TokenValidation />,
        errorElement: <ResetPwError />,
        children: [
          {
            path: 'resetpw/:id?/:token?',
            element: <ResetPw />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider theme={responsiveFontSizes(theme)}>
//         <CssBaseline />
//         <Routes>
//           <Route element={<Layout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/appointment/:id" element={<AppointmentPage />} />
//             <Route path="/bookings/:id?/" element={<BookingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Register />} />
//             <Route path="/resetpw" element={<ResetPw />} />
//             <Route element={<RequireAuth />}>
//               <Route path="/account" element={<Account />} />
//               <Route path="/account/settings" element={<Settings />} />
//               <Route path="/appointments" element={<Appointments />} />
//               <Route element={<RequireAuth requiredRole="admin" />}>
//                 <Route path="/add" element={<AddSchedule />} />
//                 <Route path="/schedule" element={<Schedule />} />
//                 <Route path="/dashboard/:id" element={<ApptStatusBoard />} />
//               </Route>
//             </Route>
//             <Route path="/unauthorized" element={<Unauthorized />} />
//           </Route>
//         </Routes>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }
