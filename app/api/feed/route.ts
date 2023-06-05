import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const allPosts = await prisma.post.findMany({
      orderBy: {createdAt: "desc"},
      include: {
        user: true,
      },
    })

    return NextResponse.json(allPosts)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const reqbody = await request.json();
    const {
      body,
      image
    } = reqbody;

    const newPost = await prisma.post.create({
      data: {
        body: body,
        image: image,
        user: {
          connect: { id: currentUser?.id  }
        }
      }
    });

    return NextResponse.json(newPost)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}