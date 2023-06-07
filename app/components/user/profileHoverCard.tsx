import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useUser } from "@/app/hooks/useUser";
import { useFollowers } from "@/app/hooks/useFollowers";
import FollowButton from "./followButton";
import { UserFull } from "@/types";
import { useState } from "react";

interface ProfileHoverCardProps {
  userID: string
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ 
  userID
}) => {
  const { user } = useUser(userID);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start w-full">
        <div className="flex">
          <Link href={`/profile/${user?.id}`}>
            <Avatar className='w-14 h-14'>
              <AvatarImage src={user?.image!} />
              <AvatarFallback>{user?.email!.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="flex">
          <FollowButton userID={user.id} />
        </div>
      </div>
      <div className="mt-2">
        <Link href={`/profile/${user?.id}`}>
          <p className="text-lg font-bold hover:underline text-white">{user?.name}</p>
        </Link>
        <Link href={`/profile/${user?.id}`}>
          <p className="text-sm">{user?.id}</p>
        </Link>
        <div className="flex w-full justify-start gap-4 mt-4 mb-4">
          <Link href={`/profile/${user?.id}`}><p className="text-sm hover:underline"><b className="font-bold text-white">{user?._count.following}</b> Following</p></Link>
          <Link href={`/profile/${user?.id}`}><p className="text-sm hover:underline"><b className="font-bold text-white">{user?._count.followers}</b> Followers</p></Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileHoverCard