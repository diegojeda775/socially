"use client";

import { UploadDropzone } from "@/lib/uploadThing";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  endpoint: "imageUploader";
  onChange: (url: string) => void;
  value: string;
}

function ImageUpload(props: ImageUploadProps) {
  const { endpoint, onChange, value } = props;
   
  if (value) {
    return (
      <div className="relative size-40">
        <img src={value} alt="upload" className="rounded-md size-40 object-cover"/>
        <Button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white"/>
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl)
      }}
      onUploadError={error => console.log("error upload image", error)}
    />
  )
}

export default ImageUpload