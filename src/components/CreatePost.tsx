"use client"
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";

async function CreatePost(props: { user: any; }) {
  const { user } = props;
  const [content, setContent] = useState<string>();
  const [imageUrl, setImageUrl] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const [showImgUpload, setShowImgUpload] = useState(false);

  const handleSubmit = async () => {

  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"}/>
            </Avatar>
            <Textarea 
              className="min-h-[100px] resize-none border-none focuse-visible:ring-0 p-0 text-base"
              disabled={isPosting}
              onChange={(e) => setContent(e?.target?.value)}
              value={content}
            />

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatePost