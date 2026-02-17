import useFetch from './customHook/useFetch'
const FetchingData = () => {
const {data, loading, error} = useFetch("https://gorest.co.in/public/v2/users")

    
  return (
    <div>
        {data.map((e, i)=>(
            <p key={i}>{e.name}</p>
        ))}
      
    </div>
  )
}

export default FetchingData
