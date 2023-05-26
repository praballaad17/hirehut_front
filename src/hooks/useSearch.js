import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../Context/userContext";

export default function useSearch(query, pageNumber, searchField) {
  const { loading, setLoading } = useUser();
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  // const [hasMore, setMore] = useState(false)
  const apiEndpoint = import.meta.env.VITE_API_URL + "/" + searchField;

  useEffect(() => {
    setResult([]);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
      setError(false);
      // searchItem(query);
      let cancel;
      axios({
        method: "GET",
        url: `${apiEndpoint}`,
        params: { query, page: pageNumber, limit: 5 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          console.log("res succes");
          // setMore(res.data.length > 0);
          setLoading(false);
          setResult(res.data);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
          setLoading(false);
          console.log(e);
        });
      return () => cancel();
    }
  }, [query, pageNumber]);

  return { result, loading, error };
}
