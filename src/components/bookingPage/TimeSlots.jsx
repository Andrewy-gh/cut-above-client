import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonDialog from "../ButtonDialog";
import BookingDialog from "./BookingDialog";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  margin: "2rem 0",
  padding: { sm: "0 1rem", md: "0" },
  overflowX: "scroll",
  overflow: { md: "visible" },
  flexWrap: { md: "wrap" },
  justifyContent: { md: "center" },
};

const TimeSlot = ({ slot, handleAgree }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box>
      <ButtonDialog
        buttonText={`${slot.start} ${slot.available.length} left`}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      >
        <BookingDialog handleAgree={handleAgree} handleClose={handleClose} />
      </ButtonDialog>
    </Box>
  );
};

export default function TimeSlots({ timeSlots, handleAgree }) {
  return (
    <>
      {timeSlots.length > 0 ? (
        <div style={{ marginBlock: "2rem" }}>
          <Typography variant="h6" align="center">
            Times Available
          </Typography>
          <Box sx={containerStyle}>
            {timeSlots.map((slot) => (
              <TimeSlot slot={slot} key={slot.id} handleAgree={handleAgree} />
            ))}
          </Box>
        </div>
      ) : (
        <Typography variant="h6" align="center">
          No Times Available
        </Typography>
      )}
    </>
  );
}
