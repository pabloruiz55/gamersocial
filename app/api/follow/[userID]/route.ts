import getCurrentUser from "@/app/actions/getCurrentUser";
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
        const currentUser = await getCurrentUser();
        const {userID} = params;

        const followState: Relationship | undefined = await getRelationship(currentUser?.id, userID);
    
        return NextResponse.json(followState);
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const {userID} = params;
  
        const followId = await prisma.follow.findFirst({
          where: {
              follower: {id: currentUser?.id},
              following: {id: userID},
          }
        });
    
        const unfollow = await prisma.follow.delete({
          where: {
            id: followId?.id
          }
        });
    
        return NextResponse.json(unfollow)
      } catch (error) {
        return new NextResponse('Internal Error trying to delete', { status: 500 });
      }
}