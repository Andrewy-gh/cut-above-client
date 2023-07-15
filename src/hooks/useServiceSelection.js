import { useDispatch, useSelector } from 'react-redux';
import { selectService, setService } from '../features/filterSlice';
import { services } from '../data/data';

export function useServiceSelection() {
  const dispatch = useDispatch();
  const service = useSelector(selectService);

  const handleServiceChange = (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    const { name, duration } = service;
    dispatch(setService({ id: serviceId, name, duration }));
  };

  return { services, service, handleServiceChange };
}
