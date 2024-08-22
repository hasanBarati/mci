import { useEffect, useState } from "react";
import { ApiStatus, PostDataType } from "../types";

export const useFetchData = () => {
  const [data, setData] = useState<PostDataType[]>([]);
  const [mainData, setMainData] = useState<PostDataType[]>([]);
  const [fetchData, setFetchData] = useState<ApiStatus>("IDLE");
  useEffect(() => {
    setFetchData("PENDING");
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        setData(result);
        setMainData(result);
        setFetchData("SUCCESS");
      } catch  {
        setFetchData("ERROR");
      }
    };

    fetchData();
  }, []);

  return { data, mainData, setData,fetchData };
};
