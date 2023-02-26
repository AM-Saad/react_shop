
// Description: This component is a container for the UploadImageInput and ImagesGallery components and is responsible for handling the images for the product


import { useState, useEffect, useId, useContext } from 'react'
import UploadImage from '@/components/UI/UploadImageInput'
import ImagesGallery from '@/components/Admin/Products/ImagesGallery'
import AdminContext from '@/store/Admin/admin-context'
import ProductsContext from '@/store/Admin/products-context'

type PreviewImages = {
    id: string
    image: any
    isNew?: boolean
}

const Images: React.FC = () => {
    const id: string = useId();

    const { updatingMeta } = useContext(AdminContext)
    const { delete_image, currentProduct, upload_image } = useContext(ProductsContext)

    const [imageWarning, setImageWarning] = useState<string | null>(null)
    const [imagesToUpload, setImagesToUpload] = useState<PreviewImages[]>([])
    const [previewImages, setPreviewImages] = useState<PreviewImages[]>([])


    const imageSelectHandler = (files: any): void => {
        // check if the selected image plus the current images is less than or equal 5
        if (currentProduct?.images.length + files.length + imagesToUpload.length > 5) {
            return setImageWarning(`Maximum images is (5) you already have (${currentProduct?.images.length}) ${imagesToUpload.length > 0 ? `and you have (${imagesToUpload.length}) in the queue` : ''}`)
        }

        let newImages = [...files]
        const fileToUpload: PreviewImages[] = []
        const fileToPreview: PreviewImages[] = []
        let objectUrl;
        for (const img of newImages) {
            objectUrl = URL.createObjectURL(img)
            fileToUpload.push({ image: img, id: id + imagesToUpload.length, isNew: true })
            fileToPreview.push({ image: objectUrl, id: id + imagesToUpload.length, isNew: true })
        }
        setImagesToUpload([...imagesToUpload, ...fileToUpload])
        setPreviewImages([...previewImages, ...fileToPreview])

        return setImageWarning(null)
    }

    const cancelUploadImages = () => {
        const images = convertImages(currentProduct?.images)
        setPreviewImages(images)
        setImagesToUpload([])
        return setImageWarning(null)
    }

    const deleteImageHandler = async (id: string, isNew: boolean) => {
        // if the image is not new then delete it from the server
        if (!isNew) {
            const response = await delete_image(currentProduct?._id!, id, 'Product')
            const converted = convertImages(response.images)
            return setPreviewImages(converted)
        }
        // if the image is new then delete it from the state
        setImagesToUpload((prevState) => prevState.filter(i => i.id !== id))
        setPreviewImages((prevState) => prevState.filter(i => i.id !== id))
    }

    const uploadImage = async () => {
        
        const response = await upload_image(currentProduct?._id!, imagesToUpload, 'Product')
        if (response) {
            setImagesToUpload([])
        }
    }


    const convertImages = (files: any) => {
        // convert the images to the correct format for the preview
        let images: PreviewImages[] = []
        for (const item of files) {
            images.push({ id: item, image: import.meta.env?.REACT_APP_REST_API_URL + item })
        }
        return images
    }

    useEffect(() => {
        const images = convertImages(currentProduct?.images)
        setPreviewImages(images)
    }, [currentProduct?.images])

    useEffect(() => {
        console.log(previewImages)
    }, [previewImages])

    return (
        <div>
            <UploadImage onSelectImage={imageSelectHandler} />
            {imageWarning && <p className='text-yellow-700'>{imageWarning}</p>}

            <ImagesGallery images={previewImages} onDeleteImage={deleteImageHandler} />
            {imagesToUpload.length > 0 &&
                <div className="flex justify-end gap-2">
                    <button type="button" className=" py-2 px-4 text-sm bg-gray-400 rounded hover:opacity-70 text-white" onClick={cancelUploadImages}>Cancel</button>
                    <button type="button" className=" py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white" onClick={() => uploadImage()}>{updatingMeta.loading ? 'Update...' : 'Update'}</button>
                </div>
            }
        </div>
    )
}

export default Images