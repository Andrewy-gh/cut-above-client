import { useState } from 'react';
import Button from '@mui/material/Button';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DateRangePicker from '../datePickers/DateRangePicker';
import dayjs from 'dayjs';
import { useAddScheduleMutation } from '../../features/scheduleSlice';
import { useNotification } from '../../hooks/useNotification';

export default function AddSchedule() {
  const openTime = '10:00';
  const closeTime = '11:00';
  const currentDate = dayjs().format('YYYY-MM-DD');
  const openString = `${currentDate} ${openTime}`;
  const closeString = `${currentDate} ${closeTime}`;
  const [open, setOpen] = useState(dayjs(openString));
  const [close, setClose] = useState(dayjs(closeString));
  const [dates, setDates] = useState([
    dayjs(),
    dayjs().add(2, 'week'),
    // .add(1, 'month')
  ]);
  const { handleSuccess, handleError } = useNotification();
  const [addSchedule] = useAddScheduleMutation();
  const handleDateChange = (newDates) => {
    setDates(newDates);
  };

  const handleAddSchedule = async (dates) => {
    try {
      const newSchedule = await addSchedule({
        dates,
        open: dayjs(open).format('HH:mm'),
        close: dayjs(close).format('HH:mm'),
      }).unwrap();
      if (newSchedule.success) {
        handleSuccess(newSchedule.message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div style={{ width: 'min(40ch, 100% - 2rem)', marginInline: 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '.5rem',
        }}
      >
        <h5>Choose your dates:</h5>
        <DateRangePicker
          dates={dates}
          handleDateChange={handleDateChange}
          minDate={dayjs()}
          maxDate={dayjs().add(1, 'month')}
        />
        <h5>Choose your times:</h5>
        <div>
          <TimePicker
            label="open"
            value={open}
            onChange={(newOpen) => setOpen(newOpen)}
          />
        </div>
        <div>
          <TimePicker
            label="close"
            value={close}
            onChange={(newClose) => setClose(newClose)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={() => handleAddSchedule(dates)}>
            Add Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}
