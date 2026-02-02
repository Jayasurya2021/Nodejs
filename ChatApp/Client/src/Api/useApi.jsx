import { useState } from "react";
import api from "./Api"
function useApi (){
    const [userData, setUserData] = useState(null)
    const request= async ({url, method="get", })=>{
        try {
            const res = await api({
               url,
               method,
               data 
            })
            setUserData(res.data)
            return res.data

        } catch (error) {
            console.log(error)
            
        }
    }
    
    return {request,userData }
}

export default useApi;