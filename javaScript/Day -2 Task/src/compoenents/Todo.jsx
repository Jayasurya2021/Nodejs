import React, { useState } from 'react'

const Todo = () => {

    const [task, setTask] = useState("")
    const [listTask, setListTask] = useState([])
    console.log(task)
    console.log(listTask)

    function HandleSubmit(e) {
        e.preventDefault()
        if (!task.trim()) return
        setListTask([...listTask, task])
        setTask("")
    }

    function deleteTask(index) {
        const updatelist = listTask.filter((_, i) => i !== index)
        setListTask(updatelist)
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>

                <input type="text" value={task} placeholder='task' onChange={(e) => setTask(e.target.value)} />
                <button type='submit'>add Task</button>
                <h1>tasks</h1>
                {listTask.length === 0 ? "No Tasks Available" : listTask.map((e, i) => (
                    <div key={i}>
                        <h5>{e}</h5>
                        <button type='button' onClick={() => deleteTask(i)}>
                            delete
                        </button>
                    </div>

                ))}

            </form>
        </div>
    )
}

export default Todo
