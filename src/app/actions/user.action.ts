"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"

export async function onUserLogin() {
 try {
  const { userId } = await auth();
  const extUser = await currentUser();
  if(!extUser || !userId) return;

  const foundUser = await prisma.user.findUnique({
    where: {
      externalId: userId,
    }
  })
  if(foundUser) return foundUser;

  const dbUser = await prisma.user.create({
    data: {
      externalId: userId,
      name: `${extUser.firstName || ""} ${extUser.lastName || ""}`,
      username: extUser.username ?? extUser.emailAddresses[0].emailAddress.split("@")[0],
      email: extUser.emailAddresses[0].emailAddress,
      image: extUser.imageUrl,
    },
  });

  return dbUser;
 } catch (error) {
  console.log('Error', error)
 }
}

export async function userLookUpByExtId(extId: string) {
  if (!extId) return;
  return await prisma.user.findFirst({
    where: { externalId: extId },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        }
      }
    }
  })
};