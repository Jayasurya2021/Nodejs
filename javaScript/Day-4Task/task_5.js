// Task 5: Student Management System (map + filter + find + reduce) const students = 
// [ { id: 1, name: "Arun", mark: 85 }, { id: 2, name: "Karthik", mark: 45 },
//  { id: 3, name: "Vijay", mark: 92 }, { id: 4, name: "Ajay", mark: 35 } ]; 
// Tasks: Display all students using map(). Display only passed students (mark >= 50) 
// using filter(). Find student with id = 3 using find(). Calculate total marks using reduce(). 
// Calculate average mark using reduce(). Interview Focus: Real-time company question combining all four methods.

const students = [
    { id: 1, name: "Arun", mark: 85 },
    { id: 2, name: "Karthik", mark: 45 },
    { id: 3, name: "Vijay", mark: 92 },
    { id: 4, name: "Ajay", mark: 35 }
]


// Display all students using map()
console.log("all students ")
students.map((e) => {
    console.log(`name: ${e.name} mark: ${e.mark}`)
})


// Display only passed students (mark >= 50) 
console.log("fillter the passed students")

const filterstudents = students.filter((e) => e.mark >= 50)

filterstudents.map((e) => {
    console.log(`name: ${e.name} mark: ${e.mark}`)
})

// Find student with id = 3 using find().

const findstudents = students.find((e) => e.id === 3)

console.log(findstudents)

// Calculate total marks using reduce().

const totalMarks = students.reduce((acc, curr) => acc + curr.mark, 0)

console.log(totalMarks)

// Calculate average mark using reduce()


const avarageMarks = students.reduce((acc, curr) => acc + curr.mark, 0)
const avarage =  avarageMarks  / students.length 
console.log(avarage)






