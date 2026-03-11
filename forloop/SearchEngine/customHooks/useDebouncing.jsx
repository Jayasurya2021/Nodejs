import { useEffect, useState } from "react"

const useDebouncing = (search, time = 500) => {
    const [debouncing, setDebouncing] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncing(search)
        }, time);
        return () => clearTimeout(timer)
    }, [search])

    return debouncing
    
}

export default useDebouncing
