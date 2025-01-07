import { useState, useEffect } from "react";

const useFetch = (url, page, itemsPerPage) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + `&_page=${page}&_per_page=${itemsPerPage}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        setTotalItems(data.items);
        setTotalPages(data.pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, itemsPerPage]);

  return { data, loading, error, totalItems, totalPages };
};

export default useFetch;
