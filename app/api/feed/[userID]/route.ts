import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    userID: string;
  }

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const allPosts = await prisma.post.findMany({
      orderBy: {createdAt: "desc"},
      where: {userId: params.userID},
      include: {
        user: true,
      },
    })

    return NextResponse.json(allPosts)
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}