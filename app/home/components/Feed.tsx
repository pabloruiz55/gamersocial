'use client';

import { AxiosError, AxiosResponse } from "axios";
import FeedItem from "./feedItem"
import PostForm from "./postForm"
import { useEffect, useState } from "react"
const axios = require('axios');

const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() =>{
    axios.get('/api/post')
      .then((response: AxiosResponse) => {
        setPosts(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {});
  },[posts]);

  return (
    <>
      <div className="flex flex-col w-full pl-4 pr-4 border-r">
        <div className="flex flex-col w-full">
          <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl pt-4">Feed</h1>
            <PostForm/>
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