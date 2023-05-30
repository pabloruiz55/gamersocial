'use client';

import axios from 'axios';
import React, { useCallback, useState } from 'react'

const PostForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const onCreatePost = useCallback(() => {
        setIsLoading(true);

        axios.post(`/api/post`, {
          body: "aaaaa",
          image: ""
        })
        .then((response) => {
            //router.push('/conversations');
            //router.refresh();
            console.log(response)
        })
        .catch((error) => console.log(error))
        //.catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
        }, []);
    

  return (
    <button onClick={() => onCreatePost()}>
        Create
    </button>
  )
}

export default PostForm