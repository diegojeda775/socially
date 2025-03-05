"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"

export async function onUserLogin() {
  const { userId } = await auth();
  const extUser = await currentUser();

  if(!extUser || !userId) return;

  const foundUser = prisma.user.findUnique({
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
}

export async function userLookUpById(id: string) {
  return await prisma.user.findFirst({
    where: { id },
  })
}