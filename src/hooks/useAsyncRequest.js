import { useState, useEffect } from "react";

const useAsyncRequest = (amount) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://176.53.61.139:7127/Mediator/Get`
        );
        const json = await response.json();
        // setData(json.results, setLoading(false));
        console.log(json);
      } catch (err) {
        console.warn("Something went wrong fetching the API...", err);
        setLoading(false);
      }
    };

    if (amount) {
      fetchData(amount);
    }
  }, [amount]);

  return [data, loading];
};

export default useAsyncRequest;