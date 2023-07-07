import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { selectService, setService } from '../../features/filterSlice';
import { theme } from '../../styles/styles';
import { services } from '../../data/data';

export default function ServiceSelect() {
  const dispatch = useDispatch();
  const service = useSelector(selectService);

  const handleServiceChange = (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    const { name, duration } = service;
    dispatch(setService({ id: serviceId, name, duration }));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Choose a service</InputLabel>
      <Select
        label="Service"
        value={service.id}
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
