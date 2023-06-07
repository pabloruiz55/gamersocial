'use client';
import { Icons } from "@/components/icons";
import FollowButton from "@/app/components/user/followButton";
import { UserFull } from "@/types";
import { useState } from "react";

interface ProfileNavBarProps {
  user: UserFull
}
  
const ProfileNavBar: React.FC<ProfileNavBarProps> = ({ 
  user
}) => {
  console.log(user);
  const [isFollowed, setIsFollowed] = useState( user.isFollowed);
  const [followers, setFollowers] = useState(user._count.followers);

  const onChangeFollow = (newFollow: number) => {
    setIsFollowed(!isFollowed);
    setFollowers(followers+newFollow);
    user._count.followers = followers+newFollow;
    user.isFollowed = !isFollowed;
  }

  return (
    <div className="flex w-full justify-between border-b p-4">
      <div className="flex items-center gap-6">
        <div className="flex w-auto h-auto">
          <Icons.arrowBack />
        </div>
        <div className="flex w-full items-center">
          <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl">
            {user?.name}
          </h1>
        </div>
      </div>
      <div className="flex w-auto items-center">
        <FollowButton user={user} isFollowed={isFollowed} onChangeFollow={onChangeFollow} />
      </div>
    </div>
  )
}

export default ProfileNavBar