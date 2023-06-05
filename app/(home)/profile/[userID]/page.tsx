import getUserProfile from "@/app/actions/getUserProfile";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileFeed from "./components/profileFeed";

interface IParams {
  userID: string;
}

export default async function ProfilePage({ params }: { params: IParams }) {
  const userProfile = await getUserProfile(params.userID);

  return (
    <>
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <div className="flex w-full border-b p-4 items-center gap-6">
            <div className="flex w-auto h-auto">
              <Icons.arrowBack />
            </div>
            <div className="flex w-full items-center">
              <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl">
                {userProfile?.name}
              </h1>
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