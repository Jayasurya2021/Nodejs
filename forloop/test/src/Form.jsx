// function Form(){
//       const [data, setData] = useState({
//     name: "",
//     email: ""
//   })
//   function InsertData(e) {
//     const { name, value } = e.target
//     setData({ ...data, [name]: value })
//   }

//   function HandleChange(e) {
//     e.preventDefault()
//     axios.post("https://gorest.co.in/public/v2/users", data)
//       .then(res => console.log(res))
//       .catch(err=>console.log(err))
//   }
  
//   return (
//     <>
//       <form onSubmit={(e) => HandleChange(e)}>
//         <input type="text" placeholder='name' value={data.name} onChange={(e) => InsertData(e)} name='name' />
//         <input type="text" placeholder='email' value={data.email} onChange={(e) => InsertData(e)} name='email' />
//         <button>submit</button>
//       </form>



//     </>
//   )

// }