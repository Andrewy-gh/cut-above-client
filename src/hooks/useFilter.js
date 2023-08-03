import { useDispatch, useSelector } from "react-redux";
import {
  selectDate,
  selectEmployee,
  selectService,
  setDate,
  setEmployee,
  setService,
} from "../features/filterSlice";
import { services } from "../data/data";

export function useFilter() {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const employee = useSelector(selectEmployee);
  const service = useSelector(selectService);

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toISOString()));
  };
  const handleEmployeeChange = (id) => {
    dispatch(setEmployee(id));
  };
  const handleServiceChange = (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    const { name, duration } = service;
    dispatch(setService({ id: serviceId, name, duration }));
  };
  return {
    date,
    employee,
    handleDateChange,
    handleEmployeeChange,
    handleServiceChange,
    service,
    services,
  };
}
