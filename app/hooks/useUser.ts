import React from "react";
import axios from "axios";
import useSWR from "swr";
import { UserFull } from "@/types";

const fetcher = async (url: string) => {
  return await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });
};

export const useUser = (userID: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/profile/${userID}`,
    fetcher
  );

  return {
    user: data as UserFull,
    isLoading,
    isError: error,
    mutate
  };
};