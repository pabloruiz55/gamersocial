import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
  ) {
    try {
      const currentUser = await getCurrentUser();
      const reqbody = await request.json();
      const {
        userID
      } = reqbody;
  
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