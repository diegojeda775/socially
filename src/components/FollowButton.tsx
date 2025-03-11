"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/app/actions/user.action";

function FollowButton(props: { userId: string; }) {
  const {userId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await toggleFollow(userId);
      toast.success("Follow User Successfull");
    } catch (error) {
      toast.error("Follow Not Successfull");
    } finally {
      setIsLoading(false)
    }
  };


  return (
    <Button 
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin"/> : "Follow"}
    </Button>
  )
}

export default FollowButton