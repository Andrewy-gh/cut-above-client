import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DateRangePicker from '../datePickers/DateRangePicker';
import dayjs from 'dayjs';
import { useAddScheduleMutation } from '../../features/scheduleSlice';

const containerStyle = {
  '@media (minWidth: 1200px)': {
    maxWidth: '600px', //'1140px'
  },
};

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

  const [addSchedule] = useAddScheduleMutation();
  const handleDateChange = (newDates) => {
    setDates(newDates);
  };

  const handleAddSchedule = async (dates) => {
    try {
      await addSchedule({
        dates,
        open: dayjs(open).format('HH:mm'),
        close: dayjs(close).format('HH:mm'),
      }).unwrap();
    } catch (error) {
      console.error(`Error add schedule ${error}`, error);
      //  dispatch(setError(`Failed to save new schedule: ${error}`));
    }
  };
  return (
    <div style={containerStyle}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          mt: '8px',
          padding: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Choose your dates:
        </Typography>
        <DateRangePicker
          dates={dates}
          handleDateChange={handleDateChange}
          minDate={dayjs()}
          maxDate={dayjs().add(1, 'month')}
        />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Choose your times:
        </Typography>
        <TimePicker
          label="open"
          value={open}
          onChange={(newOpen) => setOpen(newOpen)}
        />
        <TimePicker
          label="close"
          value={close}
          onChange={(newClose) => setClose(newClose)}
        />
        <Button variant="contained" onClick={() => handleAddSchedule(dates)}>
          Add Schedule
        </Button>
      </div>
    </div>
  );
}
