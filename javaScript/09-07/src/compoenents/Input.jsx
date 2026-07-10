import React, { useRef, useState } from 'react'


// Task 3: Clear Input
// Requirements
// Create input field.
// Store value using useState.
// Create Clear button.
// When clicked:
// Clear input value.
// Focus input again using useRef.


const Input = () => {

    const [data, setData] = useState("")
    const inputRef = useRef(null)

    function handleClick(e) {
        inputRef.current.focus();
        setData(e.target.value)
    }

    function handleDelete(){
        setData("")
        inputRef.current.focus();
    }

    return (
        <div>
            <input type="text" ref={inputRef} value={data} onChange={(e) => handleClick(e)} />
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Input
