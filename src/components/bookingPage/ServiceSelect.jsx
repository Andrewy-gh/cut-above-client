import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { theme } from '../../styles/styles';
import { services } from '../../data/data';

export default function ServiceSelect() {
  const [service, setService] = useState('');
  const handleServiceChange = (value) => {
    // const serviceId = services.find((service) => service.id === id);
    // setService(serviceId);
    console.log(value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Choose a service</InputLabel>
      <Select
        label="Barber"
        value={service}
        fullWidth
        onChange={(e) => handleServiceChange(e.target.value)}
        sx={{ color: theme.palette.secondary.main }}
      >
        {services.map((service) => {
          return (
            <MenuItem
              value={service.id}
              duration={service.duration}
              key={service.id}
            >
              {service.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
