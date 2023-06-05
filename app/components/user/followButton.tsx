'use client';
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Relationship } from "@/app/actions/getFollowRelationship";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

interface FollowButtonProps {
    follower: User | null,
    following: User | null
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    follower,
    following
  }) => {
    const notifyFollowSuccess = () => toast.success(`You are now following ${following?.name}`);
    const notifyUnfollowSuccess = () => toast.success(`You no longer follow ${following?.name}`);

    const [relationshipState, setRelationshipState] = useState<Relationship>('NoFollow');
  
    useEffect(() =>{
      getRelationship();
    },[]);
  
    const getRelationship = () => {
      axios.get(`/api/follow/${following?.id}`)
        .then((response: AxiosResponse) => {
          setRelationshipState(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {});
    }
  
    const onFollow = () => {
      getRelationship();
    }

    const follow = () => {
      axios.post(`/api/follow`, {
        userID: following?.id
      })
      .then((response) => {
          notifyFollowSuccess();
          onFollow();
      })
      .catch((error) => console.log(error))
      .finally(() => {
      })
    }

    const unfollow = () => {
      axios.delete(`/api/follow/${following?.id}`)
      .then((response) => {
          notifyUnfollowSuccess();
          onFollow();
      })
      .catch((error) => console.log(error))
      .finally(() => {
      })
    }

  return (
    <>
      {(relationshipState === 'Following' || relationshipState === 'MutalFollow') &&
      <Button className="flex w-full" onClick={unfollow}>
        Following
      </Button>}
      {(relationshipState === 'NoFollow' || relationshipState === 'Followed') && <Button className="flex w-full" onClick={follow}>
        {relationshipState === 'NoFollow' && "Follow"}
        {relationshipState === 'Followed' && "Follow back"}
      </Button>}
    </>
    
  )
}

export default FollowButton