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

    const follow = () => {
      axios.post(`/api/follow`, {
        userID: following?.id
      })
      .then((response) => {
          console.log(response);
          notifyFollowSuccess();
      })
      .catch((error) => console.log(error))
      .finally(() => {
      })
    }

  return (
    <Button className="flex w-full" onClick={follow}>
      {(relationship === 'Following' || relationship === 'MutalFollow') && "Following"}
      {relationship === 'NoFollow' && "Follow"}
      {relationship === 'Followed' && "Follow back"}
    </Button>
  )
}

export default FollowButton