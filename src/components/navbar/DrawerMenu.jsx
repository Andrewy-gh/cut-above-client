import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { theme } from "../../styles/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navigation } from "../../data/data";
import {
  selectCurrentToken,
  selectCurrentUserRole,
} from "../../features/auth/authSlice";

export default function DrawerMenu() {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentUserRole);
  const [open, setOpen] = useState(false);
  // const handleLogout = async () => {
  //   try {
  //     // await logout();
  //     // dispatch(logoutUser());
  //     console.log('logging out...');
  //   } catch (error) {
  //     console.error('Error logging out: ', error);
  //   }
  // };

  // Function to check if a link should be rendered
  const shouldRenderLink = (link) => {
    if (link.path === "/schedule") {
      // Check if user is logged in and has an admin role
      return token && role === "admin";
    } else if (link.path === "/account") {
      // Check if user is logged in
      return token;
    }
    // For all other links, render them by default
    return true;
  };

  const getList = () => (
    <div
      onClick={() => setOpen(false)}
      style={{
        height: "100vh",
        height: "100dvh",
        width: "100vw",
        backgroundColor: theme.palette.primary.main,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div>
        <IconButton
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            mb: 2,
            paddingRight: 2,
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon sx={{ color: theme.palette.secondary.main }} />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {navigation.map((link) => (
          <div key={link.id} style={{ fontFamily: "Corben", fontWeight: 700 }}>
            <Link to={link.path}>{link.name}</Link>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // width: "clamp(200px, 60%, 300px)",
          height: "30px",
          width: "30px",
        }}
      >
        <img src="https://placehold.co/1600x900" alt="placeholder image" />
      </div>
    </div>
  );
  return (
    <>
      <IconButton
        edge="start"
        onClick={() => setOpen(true)}
        sx={{
          mr: 2,
          display: { sm: "none" },
          color: theme.palette.secondary.dark,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </>
  );
}
