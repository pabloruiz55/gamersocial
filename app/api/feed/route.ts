import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { UserFull } from "@/types";

async function getPosts(userID: string | null){
  if(!userID){
    return await prisma.post.findMany({
      orderBy: {createdAt: "desc"},
      include: {
        user: {
          include: {
            _count: {
              select: { 
                followers: true,
                following: true
              },
            }
          }
        }
      },
    })
  }else{
    return await prisma.post.findMany({
      orderBy: {createdAt: "desc"},
      where: {userId: userID},
      include: {
        user: {
          include: {
            _count: {
              select: { 
                followers: true,
                following: true
              },
            }
          }
        }
      },
    })
  }
  
}

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('userID');
  try {
    const allPosts = await getPosts(id); 
    const currentUser = await getCurrentUser();
    const following = await prisma.follow.findMany({
      where: {
        followerId: currentUser?.id
      }
    });

    const followers = await prisma.follow.findMany({
      where: {
        followingId: currentUser?.id
      }
    });

    allPosts.forEach((post) => {
      post.user.isFollowed = following.some(e => e.followingId === post.userId) //TODO: see how to do the casting to UserFull
      post.user.isFollowingYou = followers.some(e => e.followerId === post.userId) //TODO: see how to do the casting to UserFull
    });

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