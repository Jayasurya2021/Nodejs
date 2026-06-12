const { add, sub } = require("./math.js")
const student = require("./students.js")
const totalMarks = require("./utils.js")
// Task 6: Default Parameters Task Create a function welcomeUser(). 
// Requirements: If name is passed → print name If no name passed → print
//  "Guest" Example welcomeUser(); welcomeUser("Ravi");

function welcomeUser(name = "Guest") {
    return name
}
console.log(welcomeUser())
console.log(welcomeUser("surya"))
// Task 7: Enhanced Object Literal Input const name = "Priya";
//  const role = "React Developer"; Task Create object using ES6 shorthand property.

const name1 = "Priya";
const role = "React Developer";

const datas = { name: name1, role: role }

console.log(datas)

// Task 8: Nullish Coalescing Operator Input const userName = null;
//  Task If value is null or undefined show: Guest User Using ?? 
// Expected Output Guest User

const pasangerName = null

console.log(pasangerName ?? "Guest")

// Task 9: Import / Export (Real Interview Task) File 1 math.js Create:
//  add() sub() Export them. File 2 app.js Import both functions and call them.
//  Expected Output 30 10

console.log(add(30, 10))
console.log(sub(30, 10))

// students.js Create and Export: const students = 
// [ { id: 1, name: "Ravi", skills: ["HTML", "CSS", "React"],
//  company: { name: "TCS" } }, { id: 2, name: "Priya", skills: ["JavaScript", "Node"],
//  company: {} } ]; Export this array. utils.js Create and Export: Function 1
//  calculateTotalMarks(...marks) Use Rest Parameter. Return total marks.

console.log(student)
console.log(totalMarks(30, 40, 50, 60))
