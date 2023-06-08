import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  postID?: string;
}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
      const currentUser = await getCurrentUser();
      const {postID} = params;

      const likesCount = await prisma.like.count({
        where: {
          postLikedId: postID
        }
      })

      const postLiked = await prisma.like.findFirst({
        where: {
          postLikedId: postID,
          userLikedId: currentUser?.id
        }
      })

      const data = {postLiked, likesCount}
      return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}