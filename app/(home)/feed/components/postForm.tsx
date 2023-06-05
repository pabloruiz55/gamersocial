'use client';

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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/icons";
import { CldUploadButton } from "next-cloudinary";
import ImageDisplay from "../../../components/feed/imageDisplay";
import toast from 'react-hot-toast';

const notifyPostSuccess = () => toast.success('New post created!');

interface FeedProps {
  onPosted: () => void;
}

const PostForm: React.FC<FeedProps> = ({ 
  onPosted 
}) => {
  const postTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postImageURL, setPostImageURL] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios.post(`/api/post`, {
      body: values.post,
      image: postImageURL
    })
    .then((response) => {
        form.reset();
        adjustTextareaSize();
        console.log(response);
        notifyPostSuccess();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setIsLoading(false)
      onPosted();
      setPostImageURL("");
    })
  }

  const handleUpload = (result: any) => {
    setPostImageURL(result.info.secure_url);
  }

  const formSchema = z.object({
    post: 
      z.string()
      .min(1, {
        message: "Post can't be empty",
      })
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
    adjustTextareaSize()
  };

  function adjustTextareaSize(){
    if (postTextareaRef.current) {
      postTextareaRef.current.style.height = "0px";
      postTextareaRef.current.style.height = (postTextareaRef.current.scrollHeight)+"px";
    }
  }

  const deletePostImage = () => {
    setPostImageURL("");
  }

  return (
    <div className="flex w-full pl-4 pr-4">
      <div className="flex w-14">
        <div className="w-10 h-10 rounded-full bg-slate-200">

        </div>
      </div>
      <div className="flex w-full">
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
            <ImageDisplay imageUrl={postImageURL} editMode={true} deletePostImage={deletePostImage} />
            <div className="flex w-full justify-between pt-4 border-t items-center">
              <div className="flex">
              <CldUploadButton 
                options={{ maxFiles: 1 }} 
                onUpload={handleUpload} 
                uploadPreset="p4ti5rlb"
              >
                <Icons.image />
              </CldUploadButton>
              </div>
              <div className="flex w-full justify-end">
                <Button className="w-20" type="submit" disabled={!form.formState.isValid}>Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default PostForm