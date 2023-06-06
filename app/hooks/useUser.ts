import React from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });
};

export const useUser = (userID: string) => {
  const { data, error, isLoading } = useSWR(`/api/profile/${userID}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error
  };
};