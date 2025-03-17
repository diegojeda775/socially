"use client"

import { getUserByUsername, getUserPosts, updateProfile } from "@/app/actions/profile.action"
import { userLookUpByExtId } from "@/app/actions/user.action"
import { User } from "@prisma/client"
import { useState } from "react"
import toast from "react-hot-toast"

type Posts = Awaited<ReturnType<typeof getUserPosts>>
type UserWithCounts = Awaited<ReturnType<typeof getUserByUsername>>

interface ProfileProps {
  posts: Posts
  likedPosts: Posts
  isFollowing: boolean
  user: NonNullable<UserWithCounts>
}

function ProfilePageClient(props: ProfileProps) {
  const { posts, likedPosts, isFollowing: initialIsFollowing, user} = props
  const currentUser = async () => (await userLookUpByExtId()).user;
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.location || "",
    loocation: user.location || "",
    website: user.website || "",
  });

const handleEditSubmit = async () => {
  const formData = new FormData();
  Object.entries(editForm).forEach(([key, value]) => {
    formData.append(key,value);
  });
  const result = await updateProfile(formData);
  if(result.success) {
    setShowEditDialog(false);
    toast.success("Profile successfully updated")
  }
}

  return (
    <div>ProfilePageClient</div>
  )
}

export default ProfilePageClient