import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs.locale('en');

export const currentDate = dayjs();

export const oneMonthFromCurrent = dayjs().add(1, 'month');

// server format
export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

// client side format
export const formatDateSlash = (date) => dayjs(date).format('MM/DD/YYYY');

// client side format
export const formatDateFull = (date) => dayjs(date).format('dddd LL');

//  possibly delete
export const formatDateToTime = (date) => dayjs(date).format('h:mma');

// adds AM and PM to date
export const formatTime = (time) =>
  dayjs(time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('h:mma');

export const formatTimeAlt = (time) => dayjs(time, 'HH:mm').format('h:mma');

export const findAvailableTimeSlots = (schedule, duration, employees) => {
  const { open, close, appointments } = schedule;
  const timeFormat = 'HH:mm';
  const searchIncrement = 15;
  const slots = [];
  let slotStart = dayjs(open);
  const slotEnd = dayjs(close);

  while (slotStart.isBefore(slotEnd)) {
    const currentSlotEnd = slotStart.add(duration, 'minute');
    const currentSlotStartString = slotStart.format(timeFormat);
    const currentSlotEndString = currentSlotEnd.format(timeFormat);

    if (currentSlotEnd.isAfter(slotEnd)) {
      break;
    }

    const availableEmployees = employees.filter((employeeId) => {
      const employeeAppointments = appointments.filter(
        (appointment) => appointment.employee === employeeId
      );
      const employeeBooked = employeeAppointments.some(
        (appointment) =>
          dayjs(appointment.start).isBefore(currentSlotEnd) &&
          dayjs(appointment.end).isAfter(slotStart)
      );
      return !employeeBooked;
    });

    if (availableEmployees.length > 0) {
      slots.push({
        id: crypto.randomUUID(),
        start: currentSlotStartString,
        end: currentSlotEndString,
        available: availableEmployees,
      });
    }

    slotStart = slotStart.add(searchIncrement, 'minute');
  }

  return slots;
};
