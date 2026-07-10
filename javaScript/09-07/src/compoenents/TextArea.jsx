// // Task 2: Character Counter
// Requirements
// Create a textarea.
// Store text using useState.
// Use useRef to focus textarea.
// Display:
// Characters : 0

import { useEffect, useRef, useState } from "react"

// As user types:

// Characters : 5
// Characters : 10




const TextArea = () => {

    const [data, setData] = useState("")
    const [characterCount, setCharacterCount] = useState(0)
    const inputRef = useRef(null)

    useEffect(() => {
            inputRef.current.focus();
            setCharacterCount(data.length)
            console.log(characterCount)
    
    }, [data])

    return (
        <div>
            <textarea name="textData" ref={inputRef} onChange={(e) => setData(e.target.value)}></textarea>
            <h1>character count : {characterCount}</h1>

        </div>
    )
}

export default TextArea
