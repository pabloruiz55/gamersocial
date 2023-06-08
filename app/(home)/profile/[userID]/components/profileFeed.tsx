'use client';

import { AxiosError, AxiosResponse } from "axios";
import FeedItem from "@/app/components/feed/feedItem";
import { useEffect, useState } from "react"
import { useFeed } from "@/app/hooks/useFeed";
import { FullPostType } from "@/types";
const axios = require('axios');

interface FeedProps {
  userID: string | undefined;
}

const ProfileFeed: React.FC<FeedProps> = ({ 
  userID 
}) => {
  const {posts} = useFeed(userID!);

  return (
    <div className="flex flex-col w-full">
      {posts?.map((post:FullPostType) => (
        <FeedItem
          key={post.id}
          data={post} 
        />
      ))}
    </div>
  )
}

export default ProfileFeed