'use client';
import { useSession } from "next-auth/react"
import Feed from "./feed/components/Feed";

export default function HomePage() {
  const session = useSession();

  return (
    <div className="flex w-full">
        <Feed />
        <div className="hidden lg:flex flex-auto w-1/3 ">
          right sidebar
        </div>
    </div>
  )
}