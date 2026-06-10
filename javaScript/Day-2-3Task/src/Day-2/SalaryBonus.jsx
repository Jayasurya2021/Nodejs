import React, { useEffect, useState } from 'react'

const SalaryBonus = () => {

    const [empName, setEmpName] = useState("")
    const [empsalary, setEmpSalary] = useState("")
    const [bonus, setBonus] = useState(0)



    useEffect(() => {
        if (empsalary > 30000 ) {
            setBonus(5000)
        } else if (empsalary > 20000) {
            setBonus(3000)
        } else {
            setBonus(1000)
        }

    }, [empsalary])

    return (
        <div>
            <form>
                <input type="text" placeholder='student name' value={empName} onChange={(e) => setEmpName(e.target.value)} />
                <input type="text" placeholder='student mark' value={empsalary} onChange={(e) => setEmpSalary(e.target.value)} />

                <div>
                    <h1>bonus</h1>
                    <h5>emp name : {empName}</h5>
                    <h5>emp mark : {empsalary}</h5>
                    <h5>emp bonus : {bonus}</h5>
                </div>
            </form>

        </div>
    )
}

export default SalaryBonus
