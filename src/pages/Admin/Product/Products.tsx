import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '@/store/Admin/admin-context';
import productsContext from '@/store/Admin/products-context';
import ProductItem from '@/components/Admin/Products/ProductItem'
import RequestStatus from '@/components/Admin/RequestStatus'
import Pagination from '@/components/Common/Pagination'
import Filters from '@/components/Admin/Products/Filters';
const Products = () => {
    const adminCtx = useContext(AdminContext)
    const productsCtx = useContext(productsContext)

    const { token } = adminCtx.authMeta
    const { productsMeta, products, fetch_products, pagination, update_pagination } = productsCtx
    const { loading, error, filters } = productsMeta
    const { currentPage } = pagination


    const updatePagination = (page: number) => {
        update_pagination({ ...pagination, currentPage: page })
    }

    useEffect(() => {
        // if (token) {
            fetch_products()
        // }
    }, [filters, token, currentPage])


    return (

        <div className="p-4 sm:p-6">
            <div className='mb-5 flex items-center justify-between'>
                <h1 className="font-bold text-2xl text-left">Products</h1>
                <Link to={`/admin/products/create`} className=' py-2 px-4 text-sm bg-green-400 rounded hover:opacity-70 text-white'>New Product</Link>
            </div>
            <Filters />
            <RequestStatus loading={loading} error={error} items={products} label="products" />

            {!loading && !error && products.length > 0 && <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {products.length > 0 && products.map(product => <ProductItem key={product._id} product={product} />)}

                </ul>
            </div>}
            {!error && pagination && <Pagination pagination={pagination} update={updatePagination} />}

        </div>


    )
}

export default Products