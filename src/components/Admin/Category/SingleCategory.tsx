import React, { useContext, useState, useId, useEffect } from 'react'
import AdminContext from '../../../store/Admin/admin-context'
import UploadImage from '../../UI/UploadImageInput'
import EditableInput from '../../UI/EditableInput'
import EditSubCategory from './EditSubCategory'
import ToggleBtn from '../../UI/ToggleBtn'
import { TrashIcon } from '@heroicons/react/solid'


const SingleCategory: React.FC = () => {

  const {
    updatingMeta,
    upload_category_image,
    delete_category_image,
    update_partial_category,
    currentCategory: category
  } = useContext(AdminContext)


  const [imageFiles, setImageFiles] = useState<any>([])
  const [imagePreview, setImagePreview] = useState<any>(null)
  const cancelUpload = React.useRef<any>(null)



  const imageSelectHandler = (files: any) => {
    const fileToUpload: any[] = []

    for (const file of files) {
      const objectUrl: string = URL.createObjectURL(files.item(file))

      fileToUpload.push({ image: file, isNew: true })
      setImagePreview(objectUrl)
    }
    const images = imageFiles.concat(fileToUpload)
    setImageFiles(images)

  }

  const cancelUploadImage = () => {
    setImageFiles([])
    setImagePreview(null)
  }



  const uploadImage = async () => {
    console.log(imageFiles)
    const res = await upload_category_image(category!._id ?? '', imageFiles, 'Category')
    if (res) {
      setImageFiles([])
    }
  }
  const deleteImageHandler = (image: string) => {
    delete_category_image(category!._id ?? '', image, 'Category')
  }

  useEffect(() => {
    if (category!.image) {
      setImagePreview(import.meta.env.REACT_APP_REST_API_URL + category!.image)
    } else {
      setImagePreview(null)
    }
  }, [category])
  return (
    <>
      <div className='flex gap-5 items-center mt-6'>

        <div className="flex">
          <span className="text-xs font-medium text-gray-600 mr-2 block">Featured</span>
          <ToggleBtn value={category!.featured} onChange={(value: any) => update_partial_category([{ featured: value }])} />
        </div>
        <div className="flex">
          <span className="text-xs font-medium text-gray-600 mr-2 block">Active</span>
          <ToggleBtn value={category!.active} onChange={(value: any) => update_partial_category([{ active: value }])} />
        </div>
      </div>
      <div className='grid sm:grid-cols-2 py-3 gap-10'>
        <div>
          <EditableInput
            label='Name'
            inputType="text"
            onSave={(value: string | number) => update_partial_category([{ name: value }])}
            defaultVal={category!.name}
            loading={updatingMeta.loading}
            required={true}
            validationMessage={'Name is required'}
          />
          <EditSubCategory defaultVal={category!.subCategory} loading={updatingMeta.loading} onSave={(value: string[]) => update_partial_category([{ subCategory: value }])} />
        </div>
        <div>

          <div>
            {!imagePreview && <UploadImage onSelectImage={imageSelectHandler} />}
            {imagePreview && <div className="w-60 p-1 overflow-hidden rounded relative shadow m-auto mb-4" style={{ aspectRatio: '1' }}>

              <TrashIcon onClick={() => deleteImageHandler(category?.image || '')} className='absolute top-2 right-2 text-red-500 hover:text-red-300 cursor-pointer h-5 w-5' aria-hidden="true" />

              <img className='h-full w-full object-contain' src={imagePreview} />
            </div>}

            {imageFiles.length > 0 && <div className="flex justify-end gap-2">
              <button type="button" className=" py-2 px-4 text-sm bg-gray-400 rounded hover:opacity-70 text-white" onClick={() => cancelUploadImage()}>Cancel</button>
              <button type="button" className=" py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white" onClick={() => uploadImage()}>{updatingMeta.loading ? 'Update...' : 'Update'}</button>
            </div>}
          </div>

        </div>
      </div>
    </>
  )
}

export default SingleCategory