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
        <FollowButton userData={user} />
      </div>
    </div>
  )
}

export default ProfileNavBar