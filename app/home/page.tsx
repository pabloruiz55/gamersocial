'use client';
import { useSession } from "next-auth/react"
import Feed from "./components/Feed";

export default function HomePage() {
  const session = useSession();

  return (
    <>
        <Feed />
        <div className="hidden lg:flex flex-auto w-1/3 ">
          right sidebar
        </div>
    </>
  )
}