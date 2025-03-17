import { getUserByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/app/actions/profile.action"
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({params}: {params: {username: string}}) {
  const user = await getUserByUsername(params.username)
  if(!user) return;

  return {
    title: user.name ?? user.username,
    description: user.bio ?? `Check out ${user.username}'s profile.`
  }
}

async function ProfilePageServer({params}: {params: {username: string}}) {
  const user = await getUserByUsername(params.username);
  if(!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);


  return (
   <ProfilePageClient posts={posts} likedPosts={likedPosts} isFollowing={isCurrentUserFollowing} user={user}/>
  )
}

export default ProfilePageServer