'use client';
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from 'axios';
import toast from 'react-hot-toast';

interface FollowButtonProps {
    following: User | null
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ 
    following
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
    <Button onClick={follow}>Follow</Button>
  )
}

export default FollowButton