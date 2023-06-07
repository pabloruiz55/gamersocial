'use client';
import { Button } from "@/components/ui/button";
import { UserFull } from "@/types";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Relationship } from "@/app/actions/getFollowRelationship";
import { useRelationship } from "@/app/hooks/useRelationship";

interface FollowButtonProps {
    user: UserFull | null,
    isFollowed: boolean
    onChangeFollow?: (newFollow: number) => void
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    user,
    isFollowed,
    onChangeFollow
  }) => {
    
    //const { relationship, isLoading , isError, mutate } = useRelationship(user?.id!);
    const notifyFollowSuccess = () => toast.success(`You are now following ${user?.name}`);
    const notifyUnfollowSuccess = () => toast.success(`You no longer follow ${user?.name}`);
  
    const onFollow = async(newFollow: number) => {
      if(onChangeFollow) onChangeFollow(newFollow);
      //await mutate();
    }

    const follow = () => {
      if(isFollowed)
      {
        axios.delete(`/api/follow/${user?.id}`)
        .then(async(response) => {
            notifyUnfollowSuccess();
            await onFollow(-1);
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
            await onFollow(1);
        })
        .catch((error) => console.log(error))
        .finally(() => {
        })
      }
      
    }

  return (
    <>
      {isFollowed &&
      <div className="group">
        <Button className="group-hover:hidden flex rounded-full pl-4 pr-4 w-24" onClick={follow}>
          Following
        </Button>
        <Button className="hidden group-hover:flex  bg-transparent outline-1 outline-red-500 outline rounded-full pl-4 pr-4 w-24" variant={"destructive"} onClick={follow}>
          Unfollow
        </Button>
      </div>
      }
      {!isFollowed && <Button className="flex rounded-full pl-4 pr-4 w-24"  onClick={follow}>
        Follow
      </Button>}
    </>
    
  )
}

export default FollowButton