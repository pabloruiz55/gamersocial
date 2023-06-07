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
    }) as UserFull;

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

    user.isFollowed = following.some(e => e.followingId === id)
    user.isFollowingYou = followers.some(e => e.followerId === id)

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUserProfile;