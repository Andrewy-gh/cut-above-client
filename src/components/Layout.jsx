import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';
import Footer from './Footer';
import Notification from './Notification';
import LoadingSpinner from './LoadingSpinner';

export default function Layout() {
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavBar />
        <div style={{ flexGrow: '1' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
      <Notification />
    </>
  );
}
