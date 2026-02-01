import { useState } from "react";

function useApi (){
    const [data, setData] = useState(null)
    const request= async (apicall)=>{
        try {
            const res = await api({
               url,
               method,
               data 
            })
            setData(res.data)
            return res.data

        } catch (error) {
            console.log(error)
            
        }
    }
    
    return {request,data }
}

export default useApi;