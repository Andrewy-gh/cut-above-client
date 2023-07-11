import { useState } from "react";
import { theme } from "../../styles/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { navigation } from "../../data/data";

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        height: "100vh",
        height: "100dvh",
        backgroundColor: theme.palette.primary.main,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
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
      <ul>
        {navigation.map((link) => (
          <div key={link.id}>{link.name}</div>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "clamp(200px, 60%, 300px)",
        }}
      >
        <img src="https://placehold.co/1600x900" />
      </div>
    </div>
  );
}
