"use server"

import { prisma } from "@/lib/prisma";
import { userLookUpByExtId } from "./user.action"

export async function getNotifications() {
  try {
    const { userId } = await userLookUpByExtId()
    if(!userId) return [];

    const notifications = await prisma.notification.findMany({
      where: { userId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
          }
        },
        post: {
          select: {
            id: true,
            image: true,
            content: true
          }
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return notifications;
  } catch (error) {
    console.log("Failed to get notifications", error)
    throw new Error("Failed to get notifications");
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        }
      },
      data: {
        read: true
      }
    })

    return {success: true}
  } catch (error) {
    console.error("Update read notifications failed", error);
    return {success: false, error: "Update read notifications failed"}
  }
}