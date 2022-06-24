import React, { useCallback, useState } from "react";
import httpClient from "../helper/httpClient";

const usePostApi = (apiPath: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const postData = async (formData: FormData) => {

    setIsLoading(true);
    httpClient
      .post(apiPath, formData)
      .then((res) => {

        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
      });
  };

  return {
    isLoading,
    data,
    postData
  }
};

export default usePostApi;
