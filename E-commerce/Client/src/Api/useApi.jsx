import { useState } from "react"

function useApi() {
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = async (apicall) => {
        try {
            const responce = await apicall()
            
        }
    }
}