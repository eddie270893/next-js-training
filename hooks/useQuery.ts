import React, { useEffect, useState } from 'react'
import { useToggle } from './useToggle';

const useQuery = <T>(key: any[], api: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useToggle(false);
  const fetchData = async () => {
    const cache = localStorage.getItem(key.toString());
    if (cache) {
      setData(JSON.parse(cache))
    } else {
      setIsLoading()
      const tmp = await api();
      localStorage.setItem(key.toString(), JSON.stringify(tmp));
      setData(tmp);
      setIsLoading()
    }
    
  }
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return { 
    fetchData,
    data,
    isLoading
  }
}

export default useQuery