import { useSelector } from 'react-redux';
import { selectEmployeeById } from '../../features/employeeSlice';

const EmployeeOption = ({ employeeId }) => {
  // employee should fetch the employee data from employeeSlice and fill with that employee's data
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );

  return <option value={employee.id}>{employee.firstName}</option>;
};

export default function Select({ employees }) {
  // employees prop is an array of ids which are a can be used to look up the employee data from main data which is fetched from employee slice
  // Example: const employess = ['id1', 'id4', 'id7']
  // the select is used to show the use which employees are immediately available and not all employees which are in the database
  return (
    <div>
      <select>
        {employees.map((employee) => (
          <EmployeeOption key={employee.id} employeeId={employee.id} />
        ))}
      </select>
    </div>
  );
}
