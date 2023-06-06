import { useSession } from "next-auth/react"
import Feed from "./feed/components/Feed";

export default function HomePage() {

  return (
    <div className="flex w-full">
        <Feed />
    </div>
  )
}