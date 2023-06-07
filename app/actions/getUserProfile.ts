import prisma from "@/app/libs/prismadb";
import { UserFull } from "@/types";
import getCurrentUser from "./getCurrentUser";

const getUserProfile = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        _count: {
          select: { 
            followers: true,
            following: true
          },
        }
      }
    });

    const currentUser = await getCurrentUser();
    const following = await prisma.follow.findMany({
      where: {
        followerId: currentUser?.id
      }
    });

    const followers = await prisma.follow.findMany({
      where: {
        followingId: currentUser?.id
      }
    });

    user.isFollowed = following.some(e => e.followingId === id) //TODO: see how to do the casting to UserFull
    user.isFollowingYou = followers.some(e => e.followerId === id) //TODO: see how to do the casting to UserFull

    if (!user) {
      return null;
    }

    return user as UserFull;
  } catch (error: any) {
    return null;
  }
};

export default getUserProfile;