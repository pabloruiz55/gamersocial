import prisma from "@/app/libs/prismadb";

const getUserProfile = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: decodeURIComponent(email)
      }
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUserProfile;