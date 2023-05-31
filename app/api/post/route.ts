import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const allPosts = await prisma.post.findMany({
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

    const newConversation = await prisma.post.create({
      data: {
        body: body,
        image: image,
        user: {
          connect: { id: currentUser?.id  }
        }
      }
    });

    console.log(currentUser);

    return NextResponse.json(newConversation)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}