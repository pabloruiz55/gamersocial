import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useUser } from "@/app/hooks/useUser";
import FollowButton from "./followButton";

interface ProfileHoverCardProps {
  userID: string
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ 
  userID
}) => {
  const { user: user, isLoading: isLoadingUser , isError: isErrorUser } = useUser(userID);
  return (
    <div>
      <div>
        <div>
          <Link href={`/profile/${user?.id}`}>
            <Avatar className='w-10 h-10'>
              <AvatarImage src={user?.image!} />
              <AvatarFallback>{user?.email!.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div>
          <FollowButton following={user} />
        </div>
      </div>
    </div>
  )
}

export default ProfileHoverCard