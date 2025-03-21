"use client"
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/app/actions/post.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

function CreatePost(props: { user: any; }) {
  const { user } = props;
  const [content, setContent] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImgUpload, setShowImgUpload] = useState(false);

  const handleSubmit = async () => {
    if(!content?.trim() && !imageUrl) return;
    setIsPosting(true);
    try {
      const response = await createPost({
          content,
          image: imageUrl,
          authorId: user.id
        }, 
      )
      if(response?.success) {
        setContent("");
        setImageUrl("")
        setShowImgUpload(false);
        toast.success("Post Created Successfully")
      }
    } catch (error) {
      console.log("Failed to create", error)
      toast.error("Post Not Created")
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image || "/avatar.png"}/>
            </Avatar>
            <Textarea 
              className="min-h-[100px] resize-none border-none focuse-visible:ring-0 p-0 text-base"
              disabled={isPosting}
              onChange={(e) => setContent(e?.target?.value)}
              placeholder="What's on your mind? ..."
              value={content}
            />
          </div>

          {(showImgUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload 
                endpoint="imageUploader"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url)
                  if(!url) setShowImgUpload(false)
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImgUpload(!showImgUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content?.trim() && !imageUrl) || isPosting}
            >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-2" />
                Post
              </>
            )}
          </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatePost