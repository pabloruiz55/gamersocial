'use client';

import { AxiosError, AxiosResponse } from "axios";
import FeedItem from "../../../components/feed/feedItem"
import PostForm from "./postForm"
import { useEffect, useState } from "react"
const axios = require('axios');

const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() =>{
    getPosts();
  },[]);

  const getPosts = () => {
    axios.get('/api/feed')
      .then((response: AxiosResponse) => {
        setPosts(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {});
  }

  const onPosted = () => {
    getPosts();
  }

  return (
    <>
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl p-2 pl-4">Feed</h1>
            <PostForm onPosted={onPosted} />
            <div className="flex flex-col w-full">
              {posts?.map((post, i) => (
                <FeedItem
                  key={i}
                  data={post} 
                />
              ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Feed