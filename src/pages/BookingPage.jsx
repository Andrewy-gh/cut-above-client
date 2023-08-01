import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEmployeesQuery } from "../hooks/useEmployeesQuery";
import { useScheduleQuery } from "../hooks/useScheduleQuery";
import BookingForm from "../components/bookingForm";
import BookingDialog from "../components/bookingDialog";
import { useAppointment } from "../hooks/useAppointment";
import { useBooking } from "../hooks/useBooking";
import { useDateSelection } from "../hooks/useDateSelection";
import { useDialog } from "../hooks/useDialog";
import { useServiceSelection } from "../hooks/useServiceSelection";
import { useEmployeeSelection } from "../hooks/useEmployeeSelection";

import { selectScheduleByFilter } from "../features/scheduleSlice";
import AvailableTimes from "../components/bookingForm/AvailableTimes";
import { mockTimeSlots } from "../data/mockData";

const url =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  background: `url(${url}) center/cover no-repeat`,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.50) 100%)",
};

const contentStyle = {
  marginInline: "auto",
  paddingBlock: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  mb: "1.5rem",
  position: "relative",
  zIndex: 2,
};

export default function BookingPage() {
  const { employees } = useEmployeesQuery();
  const { schedules } = useScheduleQuery();
  const { date } = useDateSelection();
  const { service } = useServiceSelection();
  const { employee } = useEmployeeSelection();
  const { open, selection, handleSelectAndOpen, handleClose } = useDialog();
  const { handleBooking } = useBooking();
  const { rescheduling } = useAppointment();
  const timeSlots = useSelector(selectScheduleByFilter);

  // examle timeSlots
  // console.log(timeSlots);
  // available: Array [ "64a60e878bdf8a4ac0f98209", "64a60f1a8bdf8a4ac0f98210" ]
  // ​​end: "10:30"
  // ​​id: "1cc97c1d-8be3-4f3a-8d11-492f042f4ac7"
  // ​​start: "10:00"
  // const timeSlots = mockTimeSlots;
  // console.log("timeSlots", timeSlots);

  let message;
  if (rescheduling) message = <div>Please book your new appointment</div>;

  return (
    <div>
      {message}
      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 5 }}
      >
        Messages
      </Typography>
      <BookingForm handleOpen={handleSelectAndOpen} timeSlots={timeSlots} />
      {/* <AvailableTimes timeSlots={timeSlots} openDialog={handleSelectAndOpen} /> */}
      <BookingDialog
        open={open}
        handleClose={handleClose}
        selection={selection}
        handleAgree={() =>
          handleBooking({
            date,
            start: selection.start,
            end: selection.end,
            service: service.name,
            employee,
          })
        }
      />
    </div>
  );
}
