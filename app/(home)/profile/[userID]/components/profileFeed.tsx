'use client';

import { AxiosError, AxiosResponse } from "axios";
import FeedItem from "@/app/components/feed/feedItem";
import { useEffect, useState } from "react"
const axios = require('axios');

interface ProfileProp {
    userID: string | undefined
}

const ProfileFeed = ({userID}: ProfileProp) => {
  const [posts, setPosts] = useState([]);
  useEffect(() =>{
    getPosts();
  },[]);

  const getPosts = () => {
    axios.get(`/api/feed/${userID}`
    )
      .then((response: AxiosResponse) => {
        setPosts(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {});
  }

  return (
    <div className="flex flex-col w-full mt-4">
      {posts?.map((post, i) => (
        <FeedItem
          key={i}
          data={post} 
        />
      ))}
    </div>
  )
}

export default ProfileFeed