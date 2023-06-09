'use client'
import React from 'react'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import { useState } from 'react'
import ImageModal from '../modals/imageModal'

interface ImageDisplayProps {
    imageUrl: string | null,
    editMode: boolean,
    deletePostImage?: () => void 
  }
  
  const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
    imageUrl,
    editMode,
    deletePostImage
  }) => {

  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <>
    {imageUrl && imageUrl.length > 0 &&
      <div className="flex w-full h-max mb-2 mt-4 relative">
        <AspectRatio ratio={16 / 9}>
            <Image
            src={imageUrl}
            alt="Attached image"
            className="flex rounded-lg object-cover w-full h-full border"
            onClick={() => setImageModalOpen(true)}
            height={1024}
            width={768}
            />
        </AspectRatio>
        {editMode && 
          <Button variant={"secondary"} className="absolute rounded-full left-2 top-2 p-0 w-10 h-10"
            onClick={deletePostImage}
          >
            <Icons.close />
          </Button>
        }
      </div>
    }
    <ImageModal src={imageUrl} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />  
    </>
  )
}

export default ImageDisplay