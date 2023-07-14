import { useGetEmployeesQuery } from '../features/employeeSlice';

export function useEmployeesQuery() {
  const { data: employees } = useGetEmployeesQuery();

  return {
    employees,
  };
}
