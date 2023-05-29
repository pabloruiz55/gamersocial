'use client';
import { useSession } from "next-auth/react"
import Feed from "./components/Feed";

export default function HomePage() {
  const session = useSession();

  return (
    <>
        <Feed />
    </>
  )
}