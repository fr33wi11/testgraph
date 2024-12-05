import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      first_name
      last_name
      email
      department
      joining_date
      leave_balance
    }
  }
`;

function EmployeeList() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.leave_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;