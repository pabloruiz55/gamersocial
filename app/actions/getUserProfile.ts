import prisma from "@/app/libs/prismadb";

const getUserProfile = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
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