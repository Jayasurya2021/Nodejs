// Task 1: Employee Salary Filter (filter()) You have employee data. const employees = 
// [ { id: 1, name: "John", salary: 25000 }, { id: 2, name: "David", salary: 45000 }, 
// { id: 3, name: "Sam", salary: 60000 }, { id: 4, name: "Peter", salary: 30000 } ];
//  Task: Display only employees whose salary is greater than 40,000. Show Name and Salary.
//  Interview Focus: filter()


const employees = [
    { id: 1, name: "John", salary: 25000 },
    { id: 2, name: "David", salary: 45000 },
    { id: 3, name: "Sam", salary: 60000 },
    { id: 4, name: "Peter", salary: 30000 }]

    const filterdata = employees.filter((e, _)=> e.salary > 40000 )

    console.log(filterdata)

    