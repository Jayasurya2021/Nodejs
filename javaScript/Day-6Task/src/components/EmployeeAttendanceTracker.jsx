// Task 2: Employee Attendance Tracker Requirements: Employee Name Check In Time
//  Check Out Time Attendance Status Features: Present Employees Absent Employees
//  Total Present Count Search Employee

import React, { useState } from "react";

function EmployeeAttenanceTracker() {
  const [search, setSearch] = useState("");

  const employees = [
    {
      id: 1,
      name: "Arun",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
    },
    {
      id: 2,
      name: "Kumar",
      checkIn: "",
      checkOut: "",
      status: "Absent",
    },
    {
      id: 3,
      name: "Priya",
      checkIn: "09:15 AM",
      checkOut: "06:10 PM",
      status: "Present",
    },
  ];

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const presentEmployees = employees.filter(
    (employee) => employee.status === "Present"
  );

  const absentEmployees = employees.filter(
    (employee) => employee.status === "Absent"
  );

  return (
    <div>
      <h2>Employee Attendance Tracker</h2>

      <input
        type="text"
        placeholder="Search Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Total Present Count: {presentEmployees.length}</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
            <th>Attendance Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.checkIn || "-"}</td>
              <td>{employee.checkOut || "-"}</td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Present Employees</h3>
      <ul>
        {presentEmployees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>

      <h3>Absent Employees</h3>
      <ul>
        {absentEmployees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeAttenanceTracker;
