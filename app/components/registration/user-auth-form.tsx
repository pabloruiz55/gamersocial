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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  useEffect(() => {
    if(session?.status === 'authenticated'){
        router.push('/home');
    }
}, [session?.status, router]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

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

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
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
            onClick={() => socialAction('google')}
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