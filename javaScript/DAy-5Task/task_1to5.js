// Task 1: Spread Operator Input const frontend = ["HTML", "CSS", "JavaScript"]; 
// const backend = ["Node.js", "MongoDB"]; Task Using Spread Operator: 
// Create a new array called fullStack.

const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "MongoDB"];

const fullStack = [...frontend, ...backend]

console.log(fullStack)

// Task 2: Rest Parameter Task Create a function called totalMarks. 
// Requirements: Accept any number of marks Return total marks Use 
// Rest Parameter Example totalMarks(80, 90, 70, 60);

function totalMarks(...marks) {

    console.log("marks" + marks)

}

totalMarks(80, 90, 70, 60)

// Task 3: Template Literals Input const name = "Ravi"; const role = "MERN Developer";
//  const company = "Infosys"; Task Using Template Literals create:

const name = "Ravi";
const role = "MERN Developer";
const company = "Infosys";

console.log(`name: ${name} role: ${role} company: ${company}`)

// Task 4: Object Destructuring Input const student 
// = { name: "Arun", course: "MERN", city: "Chennai" };
//  Task Using Destructuring: Store values into separate variables and print.

const student = { studentname: "Arun", course: "MERN", city: "Chennai" };

const { studentname } = student;

console.log(studentname)

// Task 5: Array Destructuring Input const colors = ["Red", "Blue", "Green"]; 
// Task Using Array Destructuring: Store first two colors in separate variables.

const colors = ["Red", "Blue", "Green"];

const [color1, color2, color3] = colors

console.log(color1)
console.log(color2)
console.log(color3)