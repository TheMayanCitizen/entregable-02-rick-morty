import { useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [response, setResponse] = useState();
  const [hasError, setHasError] = useState(false);

  const getApi = () => {
    axios
      .get(url)
      .then(({ data }) => {
        setResponse(data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  };

  return [response, getApi, hasError];
};
