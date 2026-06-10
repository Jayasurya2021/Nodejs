import React, { useState } from 'react'

const DarkMode = () => {

    const [mode, setMode] = useState(true)
    const [backgroundColor, sestBackgroundColor] = useState("whitesmoke")

    return (
        <div style={{ backgroundColor: mode ? "whitesmoke" : "gray", height: "400px", width: "100%" }}>
            <button onClick={() => setMode(!mode)}>{mode ? "change Dark Mode" : "Change Light Mode "}</button>

        </div>
    )
}

export default DarkMode