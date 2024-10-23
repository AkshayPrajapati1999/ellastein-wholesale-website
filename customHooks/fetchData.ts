import axios from "axios";
import { useCallback, useEffect, useState } from "react";
export default function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await axios.get(url);
      const data = await res?.data;
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while fetching data");
      setIsLoading(false);
    }
  }, [url, setData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, error };
}
