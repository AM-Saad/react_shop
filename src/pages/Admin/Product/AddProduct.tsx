import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import ProductForm from '../../../components/Admin/Forms/ProductForm'
import ProductsContext from '../../../store/Admin/products-context'
import AdminContext from '../../../store/Admin/admin-context'

import Product from '../../../modals/Product'
const AddProduct: React.FC = () => {
    const productsCtx = useContext(ProductsContext)
    const adminCtx = useContext(AdminContext)
    const { fetch_categories } = adminCtx



    const createProduct = async (product: Product) => {
        const form = new FormData()
        form.append('name', product.name)
        form.append('price', product.price)
        form.append('description', product.description)
        form.append('details', product.details)
        form.append('quantity', product.quantity)
        form.append('featured', JSON.stringify(product.featured))
        form.append('popular', JSON.stringify(product.popular))
        form.append('category', JSON.stringify(product.category))
        form.append('attributes', JSON.stringify(product.attributes))
        for (const img of product.images) {
            form.append('image', img.image)
        }
        productsCtx.create_product(form)
    }
    useEffect(() => {
        fetch_categories()
    }, [])
    return (
        <section className='p-4 sm:p-6 '>
            <h1 className='text-2xl font-bold mb-4'>New Product</h1>
            <ProductForm onCreate={createProduct} />
        </section>

    )
}

export default AddProduct