import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminItemGallery: React.FC<{ images: any[], onDeleteImage: (id: string, isNew: boolean) => void }> = (props) => {

  const deleteImageHandler = (id: string, isNew: boolean) => {
    props.onDeleteImage(id, isNew!)
  }
  
  return (
    <div className='flex gap-3 max-w-full overflow-scroll w-full mt-5 p-2 rounded'>
      {props.images.map((image, index) =>
        <div key={index} className="w-28 p-1 overflow-hidden rounded relative shadow" style={{ aspectRatio: '1' }}>
          <FontAwesomeIcon pull="left" icon="trash" onClick={() => deleteImageHandler(image.id, image.isNew)} className='absolute top-2 right-2 text-red-500 hover:text-red-300 cursor-pointer' />
          <img className='h-full w-full object-contain' src={image.image} />
        </div>)}
    </div>
  )
}

export default AdminItemGallery