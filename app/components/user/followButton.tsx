'use client';
import { useUser } from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { UserFull } from "@/types";
import axios from 'axios';
import toast from 'react-hot-toast';

interface FollowButtonProps {
    userID: string | null
  }

  const FollowButton: React.FC<FollowButtonProps> = ({ 
    userID
  }) => {
    const { user, mutate } = useUser(userID!);
    const notifyFollowSuccess = () => toast.success(`You are now following ${user?.name}`);
    const notifyUnfollowSuccess = () => toast.success(`You no longer follow ${user?.name}`);
  
    const onFollow = async() => {
      await mutate()
    }

    const follow = () => {
      if(user.isFollowed)
      {
        axios.delete(`/api/follow/${user?.id}`)
        .then(async(response) => {
            notifyUnfollowSuccess();
            await onFollow();
        })
        .catch((error) => console.log(error))
        .finally(() => {
        })
      }else{
        axios.post(`/api/follow`, {
          userID: user?.id
        })
        .then(async(response) => {
            notifyFollowSuccess();
            await onFollow();
        })
        .catch((error) => console.log(error))
        .finally(() => {
        })
      }
      
    }

  return (
    <>
      {user?.isFollowed &&
      <div className="group">
        <Button className="group-hover:hidden flex rounded-full pl-4 pr-4 w-24" onClick={follow}>
          Following
        </Button>
        <Button className="hidden group-hover:flex  bg-transparent outline-1 outline-red-500 outline rounded-full pl-4 pr-4 w-24" variant={"destructive"} onClick={follow}>
          Unfollow
        </Button>
      </div>
      }
      {!user?.isFollowed && <Button className="flex rounded-full pl-4 pr-4 w-24"  onClick={follow}>
        Follow
      </Button>}
    </>
    
  )
}

export default FollowButton