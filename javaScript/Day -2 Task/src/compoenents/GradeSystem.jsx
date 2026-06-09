import React, { useEffect, useState } from 'react'

const GradeSystem = () => {

    const [studentName, setStudentName] = useState("")
    const [studentMark, setStudentMark] = useState("")
    const [grade, setGrade] = useState("")



    useEffect(() => {
        if (studentMark >= 90) {
            setGrade("A")
        } else if (studentMark >= 75) {
            setGrade("B")
        } else if (studentMark >= 50) {
            setGrade("C")
        } else {
            setGrade("fail")
        }

    }, [studentMark])

    return (
        <div>
            <form>
                <input type="text" placeholder='student name' value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                <input type="text" placeholder='student mark' value={studentMark} onChange={(e) => setStudentMark(e.target.value)} />

                <div>
                    <h1>Grade</h1>
                    <h5>student name : {studentName}</h5>
                    <h5>student mark : {studentMark}</h5>
                    <h5>student grade : {grade}</h5>
                </div>
            </form>

        </div>
    )
}

export default GradeSystem
