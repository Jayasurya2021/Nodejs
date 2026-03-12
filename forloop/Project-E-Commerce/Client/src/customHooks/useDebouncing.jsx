import { useEffect, useState } from "react"

const useDebouncing = (search, time = 500) => {
    const [debouncing, setDebouncing] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            const lowercaseData = search.toLowerCase()
            setDebouncing(lowercaseData)
        }, time);
        return () => clearTimeout(timer)
    }, [search])

    return debouncing
    
}

export default useDebouncing
