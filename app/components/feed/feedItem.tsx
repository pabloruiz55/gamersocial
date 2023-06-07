'use client';
import { FullPostType } from '@/types/index';
import { format, formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageDisplay from './imageDisplay';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ProfileHoverCard from '../user/profileHoverCard';

interface FeedItemProps {
  data: FullPostType;
}

const FeedItem: React.FC<FeedItemProps> = ({ 
  data
}) => {
  return (
    <div className="flex w-full border-t p-2 pl-4 pr-4">
      <div className="flex w-14">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href={`/profile/${data.user.id}`}>
              <Avatar className='w-10 h-10'>
                <AvatarImage src={data?.user.image!} />
                <AvatarFallback>{data?.user.email!.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <ProfileHoverCard userID={data.user.id} />
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex flex-col w-full align-top">
        <div className='flex w-full gap-2'>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link className='hover:underline' href={`/profile/${data.user.id}`}>
                <p className="text-sm font-bold">{data?.user.name}</p>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <ProfileHoverCard userID={data.user.id} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-sm text-slate-500">{formatDistanceToNow(new Date(data?.createdAt),{addSuffix: true})}</p>
        </div>
        <div className="flex w-full break-all">
          <p className="text-sm">{data?.body}</p>
        </div>
        <ImageDisplay imageUrl={data.image} editMode={false} />
      </div>
    </div>
  )
}
export default FeedItem