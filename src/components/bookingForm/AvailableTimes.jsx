import { useMediaQuery } from "@mui/material/";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatTimeAlt } from "../../utils/date";
import { theme } from "../../styles/styles";

const containerMobile = {
  width: "100%",
  height: "100%",
  overflowX: "scroll",
  scrollBehavior: "smooth",
  whiteSpace: "nowrap",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const containerDesktop = {
  display: "flex",
  gap: ".5rem",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  // margin: "2rem 0",
  // padding: { sm: "0 1rem", md: "0" },
  // flexWrap: { md: "wrap" },
  // justifyContent: { md: "center" },
};

const AvailableTime = ({ children, handleOpen }) => {
  return (
    <Button variant="contained" onClick={handleOpen}>
      {children}
    </Button>
  );
};

export default function AvailableTimes({ timeSlots, openDialog }) {
  const handleOpen = (data) => openDialog(data);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let title;
  let availableTimes;
  if (timeSlots.length > 0) {
    title = (
      <Typography variant="h6" align="center" sx={{ mb: 4 }}>
        Times Available
      </Typography>
    );
    availableTimes = (
      <div style={isMobile ? containerMobile : containerDesktop}>
        {timeSlots.map((slot) => {
          const startTime = formatTimeAlt(slot.start);
          return (
            <AvailableTime
              key={slot.id}
              handleOpen={() => handleOpen(slot)}
            >{`${startTime} ${slot.available.length} left`}</AvailableTime>
          );
        })}
      </div>
    );
  } else {
    title = (
      <Typography variant="h6" align="center">
        No Times Available
      </Typography>
    );
  }

  return (
    <>
      {title}
      {/* <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
      > */}
      {availableTimes}
      {/* </div> */}
    </>
  );
}
