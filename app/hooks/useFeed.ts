import axios from "axios";
import useSWR from "swr";
import { FullPostType } from "@/types";

const fetcher = async (args: string[]) => {
  const [url, userID] = args;
  return await axios
    .get(url, { params: { userID: userID } })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });
};

export const useFeed = (userID: string) => {
  const { data, error, isLoading, mutate } = useSWR([`/api/feed`, userID],
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate
  };
};