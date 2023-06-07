'use client';

import { AxiosError, AxiosResponse } from "axios";
import FeedItem from "../../../components/feed/feedItem"
import PostForm from "./postForm"
import { useEffect, useState } from "react"
import { useFeed } from "@/app/hooks/useFeed";
import { FullPostType } from "@/types";
const axios = require('axios');

const Feed = () => {
  const {posts} = useFeed("");

  return (
    <>
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl p-2 pl-4">Feed</h1>
            <PostForm />
            <div className="flex flex-col w-full">
              {posts?.map((post:FullPostType) => (
                <FeedItem
                  key={post.id}
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