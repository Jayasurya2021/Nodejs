import { useState } from "react";
import api from "./Api";

function useApi (){
    const [data, setData] = useState(null)
    const request= async ({url, method="Get", data})=>{
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