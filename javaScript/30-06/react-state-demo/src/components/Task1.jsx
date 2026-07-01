import React, { useState } from 'react';
const Task1 = () => {

  const [fruits, setFruits] = useState([
    "Apple",
    "Orange",
    "Mango"
  ]);

 
  const addFruit = () => {
   
    if (!fruits.includes("Banana")) {
      setFruits([...fruits, "Banana"]);
    }
  };

  return (
    <div>
      <h2>Task 1: Array State Update</h2>

      <ul>
        {fruits.map((fruit, index) => (
     
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      
    
      <button onClick={addFruit}>
        Add Fruit
      </button>
    </div>
  );
};

export default Task1;
