'use client';
import { FullPostType } from '@/types/index';

interface FeedItemProps {
  data: FullPostType;
}

const FeedItem: React.FC<FeedItemProps> = ({ 
  data
}) => {
  return (
    <div className="flex w-full border-t min-h-[100px] p-4 break-all">
      {data?.body}
    </div>
  )
}

export default FeedItem