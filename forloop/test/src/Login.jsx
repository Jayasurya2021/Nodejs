import { useEffect, useState } from "react";

function Login({ datas }) {

    const [login, setLogin] = useState(false)
    const [data, setData] = useState("")
    const [time, setTime] = useState(0)

    const fruits = ["apple", "banana", "pinapple"]
    function handleChange(e) {
        e.preventDefault()
        alert(data)
    }
    useEffect(() => {
        function Timer() {
            setTimeout(() => {
                setTime(time)
            }, 1000);
        }
        Timer()
    }, [time])

    // const data1 = "1.this is the passing data to parent component to a a child component"


    return (
        <>
            {/* <h3>Pass data from a child component to a parent component using a callback function.</h3>
        <button onClick={()=>callBack(data1)} style={{color:"green"}} >send Data</button> */}
            <h3>Implement conditional rendering to show “Logged In” or “Logged Out” based on a state variable.</h3>
            <button style={{ color: "green" }} onClick={() => setLogin(!login)}>{login ? "login" : "logOut"}</button>

            <h3>Render a list of items (like fruits) from an array using the map() method.</h3>
            {fruits.map((element, index) => (
                <h4 style={{ color: "green" }} key={index}>{element}</h4>
            ))}

            <h3>Create a form that accepts user input and displays an alert on submission.</h3>
            <form onSubmit={(e) => handleChange(e)}>
                <input type="text" onChange={(e) => setData(e.target.value)} />
                <button style={{ color: "green" }} >click</button>
            </form>

            <h3>Create a timer using the useEffect hook that updates every second.</h3>
            {time}

            <h3>Pass data from a parent component to a child component using props.</h3>
            <h4 style={{ color: "green" }}>{datas}</h4>


        </>
    )

}


export default Login;