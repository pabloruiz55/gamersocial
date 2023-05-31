'use client';

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import React, {useState, useRef, ChangeEvent } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const PostForm = () => {
  const postTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios.post(`/api/post`, {
      body: values.post,
      image: ""
    })
    .then((response) => {
        //router.push('/conversations');
        //router.refresh();
        form.reset();
        console.log(response);
    })
    .catch((error) => console.log(error))
    //.catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }

  const formSchema = z.object({
    post: 
      z.string()
      .max(500, {
        message: "Post must not be longer than 500 characters.",
      })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post: "",
    },
  })

  const onHandleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (postTextareaRef.current) {
      postTextareaRef.current.style.height = "auto";
      postTextareaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-2 mb-4">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share something"
                  className="mb-4 resize-none text-xl p-0 overflow-hidden border-none outline-none focus-visible:outline-none focus-visible:ring-0"
                  {...field}
                  onInput={onHandleInput}
                  ref={postTextareaRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PostForm