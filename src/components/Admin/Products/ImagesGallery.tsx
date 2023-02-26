// Description: This component is responsible for displaying the images of any image and deleting them


import React from 'react'
import { TrashIcon } from '@heroicons/react/solid'

const ImagesGallery: React.FC<{ images: any[], onDeleteImage: (id: string, isNew: boolean) => void }> = (props) => {

  const deleteImageHandler = (id: string, isNew: boolean) => {
    props.onDeleteImage(id, isNew!)
  }

  return (
    <div className='flex gap-3 max-w-full overflow-scroll w-full mt-5 p-2 rounded'>
      {props.images.map((image, index) =>
        <div key={index} className="w-28 p-1 overflow-hidden rounded relative shadow" style={{ aspectRatio: '1' }}>
          <TrashIcon
            onClick={() => deleteImageHandler(image.id, image.isNew)} className='absolute top-2 right-2 text-red-500 hover:text-red-300 cursor-pointer h-5 w-5' aria-hidden="true" />

          <img className='h-full w-full object-contain' src={image.image} />
          
        </div>)}
    </div>
  )
}

export default ImagesGallery