import React, { useState } from 'react'

const EmployeeRegistration = () => {

    const [empName, setEmpName] = useState("")
    const [empSalary, setEmpSalary] = useState("")
    const [empDetails, setEmpDetails] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        const employeeDetails = { empName: empName, empSalary: empSalary }
        setEmpDetails([...empDetails, employeeDetails])
        setEmpName("")
        setEmpSalary("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={empName} placeholder='Employee Name' onChange={(e) => setEmpName(e.target.value)} />
                <input type="text" value={empSalary} placeholder='Employee Salary' onChange={(e) => setEmpSalary(e.target.value)} />
                <button type='submit'>submit</button>
            </form>
            <div>
                {empDetails.length === 0 ? " " : empDetails.map((e, i) => (
                    <div key={i}>
                        <h5> employee Name: {e.empName}</h5>
                        <h5>employee Salary: {e.empSalary}</h5>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EmployeeRegistration
