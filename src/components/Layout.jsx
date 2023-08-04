import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./Footer";
import Notification from "./Notification";

export default function Layout() {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          minHeight: "100dvh",
          // display: 'grid',
          // gridTemplateRows: 'auto 1fr auto',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <NavBar />
        </div>
        <div style={{ flexGrow: "1" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </div>
      <Notification />
    </>
  );
}
