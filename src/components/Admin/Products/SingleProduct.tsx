import React, { useContext, useEffect } from 'react'
import AdminContext from '@/store/Admin/admin-context'
import ProductsContext from '@/store/Admin/products-context'
import EditableInput from '@/components/UI/EditableInput'
import ToggleBtn from '@/components/UI/ToggleBtn'
import EditProductCategory from '@/components/Admin/Products/EditProductCategory'
import EditProductAttribute from '@/components/Admin/Products/EditProductAttribute'
import ImagesContainer from '@/components/Admin/Products/ImagesContainer'

const SingleProduct: React.FC = () => {

  const { fetch_categories } = useContext(AdminContext)
  const productxCtx = useContext(ProductsContext)

  const { currentProduct, updatingMeta,update_partial_product } = productxCtx


  useEffect(() => {

    fetch_categories()
  }, [currentProduct])

  return (
    <>
      <div className='grid lg:grid-cols-5 py-6 gap-8'>
        <div className='flex gap-5 items-center lg:col-span-3'>
          <div className="flex gap-2 items-center">
            <span className=" text-gray-600 block">Featured</span>
            <ToggleBtn value={currentProduct!.featured} onChange={(value: any) => update_partial_product([{ featured: value }])} />
          </div>
          <div className="flex gap-2 items-center">
            <span className=" text-gray-600 block">Popular</span>
            <ToggleBtn value={currentProduct!.popular} onChange={(value: any) => update_partial_product([{ popular: value }])} />
          </div>
        </div>
        <div className="col-span-3">
          <EditableInput
            label='Name'
            inputType="text"
            onSave={(value: string | number) => update_partial_product([{ name: value }, { slug: value.toString() }])}
            defaultVal={currentProduct!.name}
            loading={updatingMeta.loading}
            required={true}
            validationMessage={'Name is required'}

          />
          <EditableInput
            label='Price'
            inputType="number"
            onSave={(value: string | number) => update_partial_product([{ 'info.price': value }])}
            defaultVal={currentProduct!.info.price}
            loading={updatingMeta.loading}
            required={true}
            validationMessage={'Price is required'}
          />
          <EditableInput
            label='Quantity'
            inputType="number"
            onSave={(value: string | number) => update_partial_product([{ 'info.quantity': value }])}
            defaultVal={currentProduct!.info.quantity}
            loading={updatingMeta.loading}
            required={true}
            validationMessage={'Quantity is required'}
          />
          <EditableInput
            label='Description'
            inputType="text"
            onSave={(value: string | number) => update_partial_product([{ description: value }])}
            defaultVal={currentProduct!.description}
            loading={updatingMeta.loading}
            required={true}
            validationMessage={'Description is required'}
          />
          <EditableInput
            label='Details'
            inputType="text"
            onSave={(value: string | number) => update_partial_product([{ details: value }])}
            defaultVal={currentProduct!.details}
            loading={updatingMeta.loading}

          />

          <EditProductCategory defaultVal={currentProduct!.category} loading={updatingMeta.loading} onSave={(value: any) => update_partial_product([{ category: value }])} />

          <EditProductAttribute defaultVal={currentProduct!.attributes}
            loading={updatingMeta.loading} onSave={(value: any) => update_partial_product([{ attributes: value }])} />


        </div>
        <div className='lg:col-span-2'>
          <ImagesContainer/>
        </div>
      </div>


    </>
  )
}

export default SingleProduct