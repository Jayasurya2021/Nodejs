import React, { useState } from 'react';
const Task2 = () => {
  const [student, setStudent] = useState({
    name: "Ravi",
    course: "MERN",
    city: "Chennai"
  });

  const updateStudent = () => {

    setStudent({
      ...student,
      city: "Bangalore"
    });
  };

  return (
    <div>
      <h2>Task 2: Object State Update</h2>
      <div>
        <p><strong>Name :</strong> {student.name}</p>
        <p><strong>Course :</strong> {student.course}</p>
        <p><strong>City :</strong> {student.city}</p>
      </div>
      
 
      <button onClick={updateStudent}>
        Update City
      </button>
    </div>
  );
};

export default Task2;
