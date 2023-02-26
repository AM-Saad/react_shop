import React, { useEffect, useRef, useState, useContext } from 'react'

import AdminContext from '../../../store/Admin/admin-context'
import ProductContext from '../../../store/Admin/products-context'
import UploadImage from '../../UI/UploadImageInput'
import ImagesGallery from '../Products/ImagesGallery'
import ToggleBtn from '../../UI/ToggleBtn'
import Product from '../../../modals/Product'
import AttributesContainer from '../Products/AttributesContainer'
import Attribute from '../../../modals/Attribute'
import Input from '../../UI/Input'
import * as Yup from "yup";
import { Field, Formik } from "formik";
import Button from '../../UI/Button'
import { toast } from 'react-toastify'


const validationScheme = Yup.object({
    name: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
    price: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    description: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
    details: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
})

interface File {
    image: any,
    id: string | number
}


const initialValues: any = {
    name: '',
    price: '',
    quantity: '',
    description: '',
    details: '',
    featured: true,
    popular: true,
    attributes: [],
    images: [],
    category: '',
    subCategory: null,
}



const ProductForm: React.FC<{ onCreate: (newProduct: Product) => void }> = ({ onCreate }) => {


    const [subCategory, setSubCategory] = useState<string[] | undefined>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([])
    const [imagesFiles, setImagesFiles] = useState<any[]>([])
    const [imageWarning, setImageWarning] = useState<string | null>(null)
    const [imagesFilesPreview, setImagesFilesPreview] = useState<any[]>([])
    const { categories } = useContext(AdminContext)
    const { updatingMeta } = useContext(ProductContext)

    const childFunc = useRef<any>(null)


    const create = (values: any) => {
        if (attributes.length > 0 && attributes.find(i => i.options.length === 0 || i.name === '')) {
            toast.info('Add at least one option for each attributes')
            return 
        }
        const product = { ...values, category: { name: values.category, subCategory: values.subCategory } }
        product.images = imagesFiles
        product.attributes = attributes
        delete product.subCategory
        onCreate(product)
    }

    const imageSelectHandler = (files: any) => {
        if ((imagesFiles.length + files.length) <= 5) {
            let allFiles = [...files]
            const returnedFiles: File[] = []
            for (const file of allFiles) {
                const uid = Math.random()
                returnedFiles.push({ image: file, id: uid })
            }
            setImagesFiles((prevState: File[]) => prevState.concat(returnedFiles))
            return setImageWarning(null)
        }
        setImageWarning('Maximum images is (5)')
    }


    const deleteImageHandler = (id: string) => setImagesFiles(imagesFiles.filter(i => i.id !== id))


    const selectCategoryHandler = (name: string) => {
        const subcategories = categories.find(category => category.name.toLowerCase() === name.toLowerCase())?.subCategory
        setSubCategory(subcategories)
    }

    useEffect(() => {
        if (imagesFiles.length === 0) {
            setImagesFilesPreview([])
            return
        }
        let previewImages: File[] = []
        for (const item of imagesFiles) {
            const objectUrl = URL.createObjectURL(item.image)
            previewImages.push({ image: objectUrl, id: item.id })
        }
        setImagesFilesPreview(previewImages)

    }, [imagesFiles, categories])




    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={async (values, { setSubmitting }) => create(values)}
        >
            {({ handleChange, handleSubmit, setFieldValue, values }: any) => {
                return (
                    <form onSubmit={handleSubmit} onChange={handleChange} className='grid lg:grid-cols-2 gap-5 w-full'>

                        <div className='order-2 lg:order-1'>

                            <div className="flex items-center justify-between mb-3 text-left border-b-1 border-gray">
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="featured">Featured</label>
                                    <ToggleBtn value={values.featured} onChange={(val: boolean) => setFieldValue('featured', val)} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="popular">Popular</label>
                                    <ToggleBtn value={values.popular} onChange={(val: boolean) => setFieldValue('popular', val)} />
                                </div>
                            </div>

                            <Input
                                label="Product Name"
                                name="name"
                                type="text"
                                placeholder="Great Book..."
                            />
                            <Input
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="1.99"
                            />
                            <Input
                                label="Quantity"
                                name="quantity"
                                type="number"
                                placeholder="19"
                            />
                            <Input
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Describe your product"
                            />
                            <Input
                                label="Details"
                                name="details"
                                type="text"
                                placeholder="Details about your product"
                            />

                            <div className='mb-3 text-left'>
                                <label htmlFor="category" className='text-xs font-medium'>Category</label>
                                <Field
                                    component='select'
                                    name='category'
                                    id='category'
                                    className='block shadow bg-gray-50 rounded my-2 outline-white p-3 text-xs w-full'
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        selectCategoryHandler(event.target.value)
                                        setFieldValue('category', event.target.value)
                                    }
                                    }
                                >
                                    <option value='Default' selected>Default</option>
                                    {categories.map((category) => <option value={category.name}>{category.name}</option>)}
                                </Field>
                            </div>
                            {subCategory && subCategory.length > 0 &&
                                <div className='mb-3 text-left'>
                                    <label htmlFor="subCategory" className='text-xs font-medium'>Sub Category</label>
                                    <Field
                                        component='select'
                                        name='subCategory'
                                        id='subCategory'
                                        className='block shadow bg-gray-50 rounded my-2 outline-white p-3 text-xs w-full'
                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('subCategory', event.target.value)}
                                    >
                                        <option >Choose Sub Category</option>
                                        {subCategory.map((category) => <option value={category}>{category}</option>)}
                                    </Field>

                                </div>
                            }

                            <div className='lg:hidden'> <AttributesContainer updateAttributes={setAttributes} /></div>

                            <Button
                                disabled={updatingMeta.loading}
                                loading={updatingMeta.loading}
                                title="Create"
                                type="submit"
                                onClick={() => { }}
                                style="bg-green-400 mt-10"
                            />
                        </div>

                        <div className='order-1 lg:order-2'>

                            <UploadImage childFunc={childFunc} onSelectImage={imageSelectHandler} />
                            <ImagesGallery images={imagesFilesPreview} onDeleteImage={deleteImageHandler} />
                            {imageWarning && <p className='text-yellow-600'>{imageWarning}</p>}
                            <div className='hidden lg:block'> <AttributesContainer updateAttributes={setAttributes} /></div>

                        </div>

                    </form>
                )
            }
            }
        </Formik>
    )

}

export default ProductForm