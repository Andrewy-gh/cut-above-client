import dayjs from "dayjs";
import DatePicker from "../datePickers/DatePicker";
import EmployeeSelect from "./EmployeeSelect";
import ServiceSelect from "./ServiceSelect";
import AvailableTimes from "./AvailableTimes";
import { useDateSelection } from "../../hooks/useDateSelection";
import { selectScheduleByFilter } from "../../features/scheduleSlice";
import { currentDate, oneMonthFromCurrent } from "../../utils/date";
import { useSelector } from "react-redux";

export default function BookingForm({ handleOpen }) {
  const { date, handleDateChange } = useDateSelection();
  const timeSlots = useSelector(selectScheduleByFilter);

  return (
    <div
      style={{
        width: "min(40ch, 100% - 2rem)",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <EmployeeSelect />
      <ServiceSelect />
      <DatePicker
        date={dayjs(date)}
        handleDateChange={handleDateChange}
        minDate={currentDate}
        maxDate={oneMonthFromCurrent}
      />
      <AvailableTimes timeSlots={timeSlots} openDialog={handleOpen} />
    </div>
  );
}
