import { useState, useEffect, useId, useContext } from 'react'
import UploadImage from '../../UI/UploadImageInput'
import AdminItemGallery from '../../UI/AdminItemGallery'
import AdminContext from '../../../store/Admin/admin-context'
import ProductsContext from '../../../store/Admin/products-context'
import ProductResponse from '../../../modals/ProductResponse'

type DisplayedImages = {
    id: string
    image: string
    isNew?: boolean
}

const Images: React.FC = () => {

    const id: string = useId();

    const adminCtx = useContext(AdminContext)
    const { delete_image,currentProduct } = useContext(ProductsContext)
    const { updatingMeta, upload_category_image } = adminCtx
    const [imageWarning, setImageWarning] = useState<string | null>(null)
    const [imagesToUpload, setImagesToUpload] = useState<any[]>([])
    const [imagesToDisplay, setImagesToDisplay] = useState<DisplayedImages[]>([])

    const imageSelectHandler = (files: any) => {
        if ((imagesToDisplay.length + files.length + imagesToUpload.length) <= 5) {
            let allFiles = [...files]
            const fileToUpload: any[] = []
            const fileToPreview: any[] = []
            for (const file of allFiles) {
                const objectUrl: string = URL.createObjectURL(files.item(file))

                fileToUpload.push({ image: file, id: id + imagesToUpload.length, isNew: true })
                fileToPreview.push({ image: objectUrl, id: id + imagesToUpload.length, isNew: true })
            }
            const images = imagesToUpload.concat(fileToUpload)
            setImagesToUpload(images)
            const previews = imagesToDisplay.concat(fileToPreview)
            setImagesToDisplay(previews)

            return setImageWarning(null)
        }
        setImageWarning(`Maximum images is (5) you already have (${currentProduct?.images.length}) ${imagesToUpload.length > 0 ? `and you have (${imagesToUpload.length}) in the queue` : ''}`)
    }


    const cancelUploadImages = () => {
        const images = convertImages(currentProduct?.images)
        console.log(images)
        setImagesToDisplay(images)
        setImagesToUpload([])
        return setImageWarning(null)
    }

    const deleteImageHandler = async (id: string, isNew: boolean) => {
        if (!isNew) {
            const response = await delete_image(currentProduct?._id!, id, 'Product')
            const converted = convertImages(response.images)
            return setImagesToDisplay(converted)

        }

        setImagesToDisplay((prevState) => {
            return prevState.filter(i => i.id !== id)
        })
    }

    const uploadImage = async () => {
        const response = await upload_category_image(currentProduct?._id!, imagesToUpload, 'Product')
        const converted = convertImages(response.images)
        setImagesToDisplay(converted)
        setImagesToUpload([])
    }


    const convertImages = (files: any) => {
        let images: DisplayedImages[] = []
        for (const item of files) {
            images.push({ id: item, image: import.meta.env?.REACT_APP_REST_API_URL + item })
        }
        return images
    }

    useEffect(() => {
        const images = convertImages(currentProduct?.images)
        console.log(images)
        setImagesToDisplay(images)
    }, [currentProduct?.images])

    return (
        <div>
            <UploadImage onSelectImage={imageSelectHandler} />
            {imageWarning && <p className='text-yellow-600'>{imageWarning}</p>}

            <AdminItemGallery images={imagesToDisplay} onDeleteImage={deleteImageHandler} />
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