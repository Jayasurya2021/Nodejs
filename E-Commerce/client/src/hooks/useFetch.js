import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, {
          ...options,
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isCancel(err)) {
            console.log('Request canceled', err.message);
          } else {
            setError(err);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false;
      source.cancel('Operation canceled by the user.');
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
