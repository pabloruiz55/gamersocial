import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useUser } from "@/app/hooks/useUser";
import FollowButton from "./followButton";
import { UserFull } from "@/types";

interface ProfileHoverCardProps {
  userData: UserFull
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ 
  userData
}) => {
  const { user } = useUser(userData.id);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-start w-full">
          <div className="flex">
            <Link href={`/profile/${userData?.id}`}>
              <Avatar className='w-14 h-14'>
                <AvatarImage src={userData?.image!} />
                <AvatarFallback>{userData?.email!.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="flex">
            <FollowButton userData={userData} />
          </div>
        </div>
        <div className="mt-2">
          <Link href={`/profile/${userData?.id}`}>
            <p className="text-lg font-bold hover:underline text-white">{userData?.name}</p>
          </Link>
          <Link href={`/profile/${userData?.id}`}>
            <p className="text-sm">{userData?.id}</p>
          </Link>
          <div className="flex w-full justify-start gap-4 mt-4 mb-4">
            <Link href={`/profile/${user?.id}`}><p className="text-sm hover:underline"><b className="font-bold text-white">{user?._count.following}</b> Following</p></Link>
            <Link href={`/profile/${user?.id}`}><p className="text-sm hover:underline"><b className="font-bold text-white">{user?._count.followers}</b> Followers</p></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHoverCard