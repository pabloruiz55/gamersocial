import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileFeed from "./components/profileFeed";
import FollowButton from "@/app/components/user/followButton";
import getUserProfile from "@/app/actions/getUserProfile";
import Feed from "../../feed/components/Feed";
import ProfileNavBar from "./components/profileNavBar";

interface IParams {
  userID: string;
}

export default async function ProfilePage({ params }: { params: IParams }) {
  const userProfile = await getUserProfile(params.userID);
  return (
    <>
      {userProfile &&
      <div className="flex flex-col w-full min-h-screen border-r">
        <div className="flex flex-col w-full">
          <ProfileNavBar user={userProfile!} />
          <div className="flex flex-col w-full p-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userProfile?.image!} />
              <AvatarFallback>{userProfile?.email!.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <ProfileFeed userID={userProfile?.id} />
        </div>
      </div>
      }
      {!userProfile &&
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <ProfileNavBar user={userProfile!} />
          <p>This user does not exist.</p>
        </div>
      </div>
      }
    </>
  )
}