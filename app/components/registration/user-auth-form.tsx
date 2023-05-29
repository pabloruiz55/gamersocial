"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const formSchema = z.object({
    email: z.string().email()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => {
    if(session?.status === 'authenticated'){
        router.push('/home');
    }
}, [session?.status, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    emailAction(values.email);

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const socialAction = (action:string) => {
    setIsLoading(true);

    signIn(action, {
        redirect: false
    })
    .then((callback) => {
        if(callback?.error){
            //toast.error("Invalid credentials");
            console.log("Invalid credentials")
        }else if(callback?.ok){
            //toast.success("Logged in");
            console.log("Logged in");
        }
    })
    .finally(() => setIsLoading(false));
}

const emailAction = (email:string) => {
  setIsLoading(true);

  signIn("email", {
      email,
      redirect: true
  })
  .then((callback) => {
      if(callback?.error){
          //toast.error("Invalid credentials");
          console.log("Invalid credentials")
      }else if(callback?.ok){
          //toast.success("Logged in");
          console.log(callback)
          console.log("Logged in");
      }
  })
  .finally(() => setIsLoading(false));
}

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input className="flex w-full" placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex w-full mt-4" type="submit">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center w-full">
        <Button className="w-full" variant="outline" type="button" disabled={isLoading}
            onClick={() => socialAction('google')}
        >
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>

        <Button className="w-full" variant="outline" type="button" disabled={isLoading}
            onClick={() => socialAction('discord')}
        >
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Icons.discord className="mr-2 h-4 w-4" />
            )}{" "}
            Discord
        </Button>
      </div>
    </div>
  )
}