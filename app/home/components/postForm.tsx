'use client';

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
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
        adjustTextareaSize(32);
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
    adjustTextareaSize(e.target.scrollHeight)
  };

  function adjustTextareaSize(size: number){
    if (postTextareaRef.current) {
      postTextareaRef.current.style.height = "5px";
      postTextareaRef.current.style.height = `${size}px`;
    }
  }

  return (
    <div className="flex w-full">
      <div className="flex w-14 p-2">
        <div className="w-10 h-10 rounded-full bg-slate-200">

        </div>
      </div>
      <div className="flex w-full p-2">
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
                      className="min-h-[32px] h-8 mb-2 resize-none text-xl p-0 overflow-hidden border-none outline-none focus-visible:outline-none focus-visible:ring-0"
                      {...field}
                      onInput={onHandleInput}
                      ref={postTextareaRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full pt-4 justify-end border-t">
              <Button className="w-20" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default PostForm