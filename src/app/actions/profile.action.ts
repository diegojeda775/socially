"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { userLookUpByExtId } from "./user.action"

export async function getUserByUsername(username: string) {
  console.log("user name", username)
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          }
        },
      }
    })
console.log("found user", user)
    return user
  } catch (error) {
    console.error("error getting user", error);
    throw new Error("Failed to fetch profile");
  }
  
}

export async function getUserPosts(authorId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
      }, 
      include: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                image: true,
                name: true,
                username: true,
              }
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        }, 
        likes: {
          select: {
            userId: true,
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return posts;
  } catch (error) {
    console.error("error getting user posts", error);
    throw new Error("Failed to fetch user posts");
  }
}

export async function getUserLikedPosts(userId: string) {
  try {
    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return likedPosts;
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    throw new Error("Failed to fetch liked posts");
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const { userId } = await userLookUpByExtId();
    if (!userId) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const website = formData.get("website") as string;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        location,
        website,
      },
    });

    revalidatePath("/profile");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function isFollowing(userId: string) {
  try {
    const { userId: currentUserId } = await userLookUpByExtId();

    if (!currentUserId) return false;

    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId,
        },
      },
    });

    return !!follow;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}