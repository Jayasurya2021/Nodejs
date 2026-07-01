import React, { useState } from 'react';
const Task3 = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ravi",
      salary: 25000
    },
    {
      id: 2,
      name: "Priya",
      salary: 30000
    },
    {
      id: 3,
      name: "Arun",
      salary: 35000
    }
  ]);
  const updateSalary = (id) => {

    const updatedEmployees = employees.map((employee) => {

      if (employee.id === id) {

        return { ...employee, salary: 50000 };
      }

      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h2>Task 3: Array of Objects State Update</h2>
      

      <div>
        {employees.map((employee) => (

          <div key={employee.id}>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            

            {employee.id === 2 && employee.salary !== 50000 && (
              <button 
                onClick={() => updateSalary(employee.id)}
              >
                Update Salary
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task3;
