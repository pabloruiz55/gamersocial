import getUserProfile from "@/app/actions/getUserProfile";
import { NextResponse } from "next/server";

interface IParams {
  userID?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
  ) {
    try {
        const currentUser = await getUserProfile(params?.userID!);

        return NextResponse.json(currentUser);
    } catch (error) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }