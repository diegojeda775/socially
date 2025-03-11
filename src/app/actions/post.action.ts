 "use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { userLookUpByExtId } from "./user.action";

export async function createPost (data: {content?: string, imageUrl?: string, authorId: string}) {
    if (!data || !data.authorId) return;
    try {
      const post = await prisma.post.create({
        data,
      });
  
      if(!post) throw new Error("Post not created");
      revalidatePath("/")
      return {success: true, post};
    } catch (error) {
      return {success: false, error}
    }
 }

 export async function getPosts() {
  try {
    const posts = prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            username: true,
          }
        }, 
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                username: true,
              }
            }
          },
          orderBy: {
            createdAt: "asc",
          }
        },
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
    });
    return posts
  } catch (error) {
    console.log("posts errors", error);
    throw new Error("Failed to fetch posts");
  }

 } 