import axios from "axios";
import { useState, useEffect } from "react";
import Url from "../config.json";

export default function useSearch(query, pageNumber, searchField) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  // const [hasMore, setMore] = useState(false)
  const apiEndpoint = Url?.localUrl + "/" + searchField;

  useEffect(() => {
    setResult([]);
  }, [query]);

  useEffect(() => {
    if (!query?.length) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
      setError(false);
      // searchItem(query);
      let cancel;
      axios({
        method: "GET",
        url: `${apiEndpoint}/search/${query}`,
        // params: { page: pageNumber, limit: 5 },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
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
