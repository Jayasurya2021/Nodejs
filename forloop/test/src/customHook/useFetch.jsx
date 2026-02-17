import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url); 
        setData(res.data);                  

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    dataFetch();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;