import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { usePostLiked } from "@/app/hooks/usePostLiked"

interface LikeButtonProps {
  postID: string | null
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
  postID
}) => {
  const {postLiked, likesCount, mutate} = usePostLiked(postID!);

  const onLike = async() => {
    await mutate()
  }

  const like = () => {
    axios.post(`/api/like`, {
      postID: postID
    })
    .then(async(response) => {
        await onLike();
    })
    .catch((error) => console.log(error))
    .finally(() => {
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Button size={"sm"} 
        className="group bg-transparent hover:bg-transparent text-slate-500 hover:text-pink-600 p-0"
        onClick={like}
      >
        {postLiked &&
          <><Icons.heart className="w-6 h-6 p-1 group-hover:bg-pink-500 group-hover:bg-opacity-30 group-hover:rounded-full fill-pink-600 text-pink-600" /> <p className="inline text-xs text-pink-600">{likesCount}</p></>
        }
        {!postLiked &&
          <><Icons.heart className="w-6 h-6 p-1 group-hover:bg-pink-500 group-hover:bg-opacity-30 group-hover:rounded-full" /> <p className="inline text-xs">{likesCount}</p></>
        }
      </Button>
    </div>
  )
}

export default LikeButton