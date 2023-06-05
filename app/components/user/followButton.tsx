'use client';
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Relationship } from "@/app/actions/getFollowRelationship";

interface FollowButtonProps {
    follower: User | null,
    following: User | null,
    relationship: Relationship | null | undefined
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    follower,
    following,
    relationship
  }) => {

    const notifyFollowSuccess = () => toast.success(`You are now following ${following?.name}`);
    
    const notifyUnfollowSuccess = () => toast.success(`You no longer follow ${following?.name}`);

    const follow = () => {
      axios.post(`/api/follow`, {
        userID: following?.id
      })
      .then((response) => {
          notifyFollowSuccess();
      })
      .catch((error) => console.log(error))
      .finally(() => {
      })
    }

    const unfollow = () => {
      axios.delete(`/api/follow/${following?.id}`)
      .then((response) => {
          notifyUnfollowSuccess();
      })
      .catch((error) => console.log(error))
      .finally(() => {
      })
    }

  return (
    <>
      {(relationship === 'Following' || relationship === 'MutalFollow') &&
      <Button className="flex w-full" onClick={unfollow}>
        Following
      </Button>}
      {(relationship === 'NoFollow' || relationship === 'Followed') && <Button className="flex w-full" onClick={follow}>
        {relationship === 'NoFollow' && "Follow"}
        {relationship === 'Followed' && "Follow back"}
      </Button>}
    </>
    
  )
}

export default FollowButton