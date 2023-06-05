import prisma from "@/app/libs/prismadb";

export type Relationship = 'Following' | 'Followed' | 'MutalFollow' | 'NoFollow';

const getRelationship = async (follower: string | undefined, following:string | undefined) => {
  try {
    const isFollowing = await prisma.follow.findFirst({
        where: {
            follower: {id: follower},
            following: {id: following},
        }
    });

    const isFollowed = await prisma.follow.findFirst({
        where: {
            follower: {id: following},
            following: {id: follower},
        }
    });

    if(isFollowing && isFollowed) return 'MutalFollow';
    if(!isFollowing && !isFollowed) return 'NoFollow';
    if(isFollowing) return 'Following';
    if(isFollowed) return 'Followed';


  } catch (error: any) {
    return 'NoFollow';
  }
};

export default getRelationship;