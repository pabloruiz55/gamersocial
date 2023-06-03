'use client';
import { useSession } from "next-auth/react"

interface IParams {
  userID: string;
}

export default function ProfilePage({ params }: { params: IParams }) {
  const session = useSession();

  return (
    <div className="flex w-full">
        {params.userID}
    </div>
  )
}