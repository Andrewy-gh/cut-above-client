import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          minHeight: "100dvh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
