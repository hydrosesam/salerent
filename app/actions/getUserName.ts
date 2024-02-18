import prisma from '@/app/libs/prismadb';

export async function getUsernameByUserId(userId: string): Promise<string | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      return user?.name || null;
    } catch (error: any) {
      throw new Error(error);
    }
  }