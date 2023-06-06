import getUserProfile from "@/app/actions/getUserProfile";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getRelationship, { Relationship } from "@/app/actions/getFollowRelationship";

interface IParams {
  userID?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
  ) {
    try {
        const {userID} = params;
        const followers = await prisma.follow.count({
          where: {
            followingId: userID
          }
        });

        const following = await prisma.follow.count({
          where: {
            followerId: userID
          }
        });

        

        const followData = {followers: followers, following: following}
    
        return NextResponse.json(followData);
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }
