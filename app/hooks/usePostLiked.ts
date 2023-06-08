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

export const usePostLiked = (postID: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/like/${postID}`,
    fetcher
  );

  return {
    postLiked: data?.postLiked, 
    likesCount: data?.likesCount,
    isLoading,
    isError: error,
    mutate
  };
};