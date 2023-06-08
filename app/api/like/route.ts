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
        postID
      } = reqbody;

      const hasLiked = await prisma.like.findFirst({
        where: {
          postLikedId: postID,
          userLikedId: currentUser?.id
        }
      })

      if(!hasLiked){
        const like = await prisma.like.create({
          data: {
            postLiked: {
              connect: { id: postID}
            },
            userLiked: {
              connect: { id: currentUser?.id}
            }
          }
        });
        return NextResponse.json(like)
      }else{
        const like = await prisma.like.delete({
          where: {
            id: hasLiked.id
          }
        });
        return NextResponse.json(like)
      }
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }