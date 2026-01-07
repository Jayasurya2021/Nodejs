import { useState } from 'react';

const useApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async (apiCall) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall();
            setData(response.data);
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error, data };
};

export default useApi;

