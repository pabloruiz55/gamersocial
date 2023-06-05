import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getRelationship, {Relationship} from "@/app/actions/getFollowRelationship";

export async function POST(
    request: Request,
  ) {
    try {
      const currentUser = await getCurrentUser();
      const reqbody = await request.json();
      const {
        userID
      } = reqbody;

      const alreadyFollowing: Relationship | undefined = await getRelationship(currentUser?.id, userID);
  
      if (alreadyFollowing === 'Following' || alreadyFollowing === 'MutalFollow') {
        return new NextResponse('Already Following', { status: 400 });
      }
  
      const follow = await prisma.follow.create({
        data: {
          follower: {
            connect: { id: currentUser?.id  }
          },
          following: {
            connect: { id: userID  }
          }
        }
      });
  
      return NextResponse.json(follow)
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }