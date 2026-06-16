// Task 1: Online Exam Result System Create an array of questions and marks.
//  Requirements: Display all students Calculate total marks Calculate average marks
// Find topper student Display pass/fail status

import React, { useState } from 'react'

function OnlineExamResult() {

    const [student, setStudent] = useState("")
    const [marks, setMarks] = useState([])
    const [totalMarks, setTotalMarks] = useState(0)
    const [avarageMark, setAverageMark] = useState(0)

    const students = [
        {
            id: 1,
            name: "Arun",
            marks: [18, 20, 15, 17, 19]
        },
        {
            id: 2,
            name: "Priya",
            marks: [20, 19, 18, 20, 17]
        },
        {
            id: 3,
            name: "Karthika",
            marks: [12, 14, 10, 15, 13]
        },
        {
            id: 4,
            name: "Divya",
            marks: [16, 18, 17, 19, 20]
        },
        {
            id: 5,
            name: "Rahul",
            marks: [8, 10, 12, 9, 11]
        }
    ];

    function HandleClick(index) {
        const selectedMarks = students[index].marks;
        setStudent(students[index].name)
        setMarks(selectedMarks)
        const totalMarks = selectedMarks.reduce((acc, curr) => acc + curr, 0)
        setTotalMarks(totalMarks)
        const avarage = totalMarks / selectedMarks.length
        setAverageMark(avarage)

    }


    return (
        <>
            <select onChange={(e) => HandleClick(e.target.value)}>
                <option> Select Student</option>
                {students.map((e, i) => (
                    <option value={i} key={e.id} >{e.name}</option>
                ))}
            </select>
            <h1>{student}</h1>
            <h1>total Marks {totalMarks}</h1>
            <h1>Avarage Marks {avarageMark}</h1>




        </>
    )
}

export default OnlineExamResult
