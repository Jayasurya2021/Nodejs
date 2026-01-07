import axios from "axios";
import { useState } from "react";
function Api(url) {
    const [data, setData] = useState("")
    try {
        axios.post(url, data)
            .then(res =>)
    } catch (error) {

    }

}

export default Api;