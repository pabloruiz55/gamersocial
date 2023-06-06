'use client';
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Relationship } from "@/app/actions/getFollowRelationship";
import { useRelationship } from "@/app/hooks/useRelationship";

interface FollowButtonProps {
    following: User | null,
    onChangeFollow?: () => void
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    following,
    onChangeFollow
  }) => {
    
    const { relationship, isLoading , isError, mutate } = useRelationship(following?.id!);
    const notifyFollowSuccess = () => toast.success(`You are now following ${following?.name}`);
    const notifyUnfollowSuccess = () => toast.success(`You no longer follow ${following?.name}`);
  
    const onFollow = async() => {
      if(onChangeFollow) onChangeFollow();
      await mutate();
    }

    const follow = () => {
      if(relationship === 'Following' || relationship === 'MutalFollow')
      {
        axios.delete(`/api/follow/${following?.id}`)
        .then(async(response) => {
            notifyUnfollowSuccess();
            await onFollow();
        })
        .catch((error) => console.log(error))
        .finally(() => {
        })
      }else{
        axios.post(`/api/follow`, {
          userID: following?.id
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
      {(relationship === 'Following' || relationship === 'MutalFollow') &&
      <div className="group">
        <Button className="group-hover:hidden flex rounded-full pl-4 pr-4 w-24" onClick={follow}>
          Following
        </Button>
        <Button className="hidden group-hover:flex  bg-transparent outline-1 outline-red-500 outline rounded-full pl-4 pr-4 w-24" variant={"destructive"} onClick={follow}>
          Unfollow
        </Button>
      </div>
      }
      {(relationship === 'NoFollow' || relationship === 'Followed') && <Button className="flex rounded-full pl-4 pr-4 w-24"  onClick={follow}>
        {relationship === 'NoFollow' && "Follow"}
        {relationship === 'Followed' && "Follow"}
      </Button>}
      {(isLoading) && <Button className="flex rounded-full pl-4 pr-4 w-24"  onClick={follow}>
        Follow
      </Button>}
    </>
    
  )
}

export default FollowButton