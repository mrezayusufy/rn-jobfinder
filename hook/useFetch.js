import axios from "axios";
import { useEffect, useState } from "react";
import { RAPID_API_KEY } from "@env";

const useFetch = (endpoints, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // options
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/'+endpoints,
    params: query,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };
  // fetch data functions
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log('error', error)
    } finally {
      setIsLoading(false);
    }
  }
  // useEffect hook
  useEffect(() => {
    fetchData();
  }, [])
  // refetch data
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;
