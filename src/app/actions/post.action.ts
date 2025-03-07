 "use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPost = async (data: {content?: string, imageUrl?: string, authorId: string}) => {
    if (!data) return;
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