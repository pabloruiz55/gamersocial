import getUserProfile from "@/app/actions/getUserProfile";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileFeed from "./components/profileFeed";
import FollowButton from "@/app/components/user/followButton";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getRelationship from "@/app/actions/getFollowRelationship";


interface IParams {
  userID: string;
}

export default async function ProfilePage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const userProfile = await getUserProfile(params.userID);
  const relationship = await getRelationship(currentUser?.id, userProfile?.id);

  return (
    <>
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between border-b p-4">
            <div className="flex items-center gap-6">
              <div className="flex w-auto h-auto">
                <Icons.arrowBack />
              </div>
              <div className="flex w-full items-center">
                <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl">
                  {userProfile?.name}
                </h1>
              </div>
            </div>
            <div className="flex w-auto items-center">
              <FollowButton follower={currentUser} following={userProfile} relationship={relationship} />
            </div>
          </div>
          <div className="flex flex-col w-full p-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userProfile?.image!} />
              <AvatarFallback>{userProfile?.email!.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <ProfileFeed userID={userProfile?.id} />
          </div>
        </div>
      </div>
    </>
  )
}